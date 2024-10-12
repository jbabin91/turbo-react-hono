import { insertTaskSchema, patchTaskSchema, selectTaskSchema } from '@repo/db';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { z } from 'zod';

import { commonRoutes } from '../../lib/configure-open-api';
import { HttpStatusCodes } from '../../lib/constants';
import { createRouteConfig } from '../../lib/route-config';
import { isAuthenticated } from '../../middlewares/guard';
import {
  errorResponses,
  successWithDataSchema,
  successWithoutDataSchema,
} from '../../utils/schema/common-responses';
import { idParamsSchema } from '../../utils/schema/common-schemas';

const tags = [commonRoutes.tasks.name];

export const list = createRouteConfig({
  path: '/tasks',
  method: 'get',
  tags,
  guard: [isAuthenticated],
  summary: 'Get a list of tasks',
  description: 'Get a list of tasks.',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(z.array(selectTaskSchema)),
      'The list of tasks',
    ),
    ...errorResponses,
  },
});

export const create = createRouteConfig({
  path: '/tasks',
  method: 'post',
  tags,
  summary: 'Create a task',
  description: 'Create a task.',
  guard: [isAuthenticated],
  request: {
    body: jsonContentRequired(insertTaskSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      successWithDataSchema(selectTaskSchema),
      'The created tasks',
    ),
    ...errorResponses,
  },
});

export const getOne = createRouteConfig({
  path: '/tasks/{id}',
  method: 'get',
  tags,
  guard: [isAuthenticated],
  summary: 'Get a task by id',
  description: 'Get a task by id.',
  request: {
    params: idParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(selectTaskSchema),
      'The requested task',
    ),
    ...errorResponses,
  },
});

export const patch = createRouteConfig({
  path: '/tasks/{id}',
  method: 'patch',
  tags,
  guard: [isAuthenticated],
  summary: 'Update a task by id',
  description: 'Update a task by id.',
  request: {
    params: idParamsSchema,
    body: jsonContentRequired(patchTaskSchema, 'The task updates'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(selectTaskSchema),
      'The updated task',
    ),
    ...errorResponses,
  },
});

export const remove = createRouteConfig({
  path: '/tasks/{id}',
  method: 'delete',
  tags,
  guard: [isAuthenticated],
  summary: 'Delete a task by id',
  description: 'Delete a task by id.',
  request: {
    params: idParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: jsonContent(
      successWithoutDataSchema,
      'Success: no content',
    ),
    ...errorResponses,
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
