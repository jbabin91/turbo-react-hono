import { patchUserSchema, selectUserSchema } from '@repo/db';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import { commonRoutes } from '../../lib/configure-open-api';
import { HttpStatusCodes } from '../../lib/constants';
import { createRouteConfig } from '../../lib/route-config';
import { isAuthenticated } from '../../middlewares/guard';
import {
  errorResponses,
  successWithDataSchema,
  successWithErrorsSchema,
  successWithoutDataSchema,
} from '../../utils/schema/common-responses';
import { idsQuerySchema } from '../../utils/schema/common-schemas';

const tags = [commonRoutes.me.name];

export const getSelf = createRouteConfig({
  path: '/me',
  method: 'get',
  tags,
  guard: [isAuthenticated],
  summary: 'Get self',
  description:
    'Get the current user (self). It includes a `counts` object and a list of `sessions`.',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(selectUserSchema),
      'The current user',
    ),
    ...errorResponses,
  },
});

export const updateSelf = createRouteConfig({
  path: '/me',
  method: 'patch',
  tags,
  guard: [isAuthenticated],
  summary: 'Update self',
  description: 'Update the current user (self).',
  request: {
    body: jsonContentRequired(
      patchUserSchema.omit({ role: true }),
      'The user to update',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(selectUserSchema),
      'The updated user',
    ),
    ...errorResponses,
  },
});

export const remove = createRouteConfig({
  path: '/me',
  method: 'delete',
  tags,
  guard: [isAuthenticated],
  summary: 'Delete self',
  description: 'Delete the current user (self).',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(successWithoutDataSchema, 'User deleted'),
    ...errorResponses,
  },
});

export const removeSession = createRouteConfig({
  path: '/me/sessions',
  method: 'delete',
  tags,
  guard: [isAuthenticated],
  summary: 'Terminate sessions',
  description:
    'Terminate all sessions of the current user (self), except for the current session.',
  request: {
    query: idsQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithErrorsSchema(),
      'Sessions terminated',
    ),
    ...errorResponses,
  },
});

export type GetSelfRoute = typeof getSelf;
export type UpdateSelfRoute = typeof updateSelf;
export type RemoveRoute = typeof remove;
export type RemoveSessionRoute = typeof removeSession;
