import { patchUserSchema, selectUserSchema } from '@repo/db';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import { commonRoutes } from '../../lib/configure-open-api';
import { HttpStatusCodes } from '../../lib/constants';
import { createRouteConfig } from '../../lib/route-config';
import { isAuthenticated, systemGuard } from '../../middlewares/guard';
import {
  errorResponses,
  successWithDataSchema,
  successWithErrorsSchema,
  successWithPaginationSchema,
} from '../../utils/schema/common-responses';
import {
  idParamsSchema,
  idsQuerySchema,
} from '../../utils/schema/common-schemas';
import { usersQuerySchema } from './helpers/schema';

const tags = [commonRoutes.users.name];

export const list = createRouteConfig({
  path: '/users',
  method: 'get',
  tags,
  guard: [isAuthenticated],
  summary: 'Get a list of users',
  description: 'Get a list of users on system level.',
  request: {
    query: usersQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithPaginationSchema(selectUserSchema),
      'The list of users',
    ),
    ...errorResponses,
  },
});

export const getOne = createRouteConfig({
  path: '/users/{id}',
  method: 'get',
  tags,
  guard: [isAuthenticated],
  summary: 'Get user',
  description: 'Get a user by id.',
  request: {
    params: idParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(selectUserSchema),
      'The requested user',
    ),
    ...errorResponses,
  },
});

export const patch = createRouteConfig({
  path: '/users/{id}',
  method: 'patch',
  tags,
  guard: [isAuthenticated],
  summary: 'Update user',
  description: 'Update a user by id.',
  request: {
    params: idParamsSchema,
    body: jsonContentRequired(patchUserSchema, "The user's updates"),
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
  path: '/users',
  method: 'delete',
  tags,
  guard: [isAuthenticated, systemGuard],
  summary: 'Delete user(s)',
  description: 'Delete users from system by list of ids.',
  request: {
    query: idsQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithErrorsSchema(),
      'Success: with errors',
    ),
    ...errorResponses,
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
