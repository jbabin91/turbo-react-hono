import { createRoute } from '@hono/zod-openapi';
import { insertTaskSchema, patchTaskSchema, selectTaskSchema } from '@repo/db';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { z } from 'zod';

import { HttpStatusCodes } from '../../lib/constants';
import {
  errorResponses,
  successWithDataSchema,
  successWithoutDataSchema,
} from '../../utils/schema/common-responses';
import { idParamsSchema } from '../../utils/schema/common-schemas';

const tags = ['Tasks'];

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithDataSchema(z.array(selectTaskSchema)),
      'The list of tasks',
    ),
    ...errorResponses,
  },
});

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  tags,
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

export const getOne = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  tags,
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

export const patch = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  tags,
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

export const remove = createRoute({
  path: '/tasks/{id}',
  method: 'delete',
  tags,
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
