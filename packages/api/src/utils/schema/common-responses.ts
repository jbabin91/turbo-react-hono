/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type createRoute } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import { z } from 'zod';

import { HttpStatusCodes } from '../../lib/constants';
import { errorSchema, failWithErrorSchema } from './common-schemas';

type Responses = Parameters<typeof createRoute>[0]['responses'];

export const successWithoutDataSchema = z.object({
  success: z.boolean(),
});

export const successWithDataSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.boolean(),
    data: schema,
  });

export const successWithPaginationSchema = <T extends z.ZodTypeAny>(
  schema: T,
) =>
  z.object({
    success: z.boolean(),
    data: z.object({
      items: z.array(schema),
      total: z.number(),
    }),
  });

export const successWithErrorsSchema = () =>
  z.object({
    success: z.boolean(),
    errors: z.array(errorSchema),
  });

export const errorResponses = {
  [HttpStatusCodes.BAD_REQUEST]: {
    description: 'Bad request: problem processing request.',
    content: {
      'application/json': {
        schema: failWithErrorSchema,
      },
    },
  },
  [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    failWithErrorSchema,
    'Unauthorized: authentication required.',
  ),
  [HttpStatusCodes.FORBIDDEN]: jsonContent(
    failWithErrorSchema,
    'Forbidden: insufficient permissions.',
  ),
  [HttpStatusCodes.NOT_FOUND]: jsonContent(
    failWithErrorSchema,
    'Not found: resource does not exist.',
  ),
  [HttpStatusCodes.CONFLICT]: jsonContent(
    failWithErrorSchema,
    'Conflict: resource already exists.',
  ),
  [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
    failWithErrorSchema,
    'Unprocessable entity: validation error.',
  ),
  [HttpStatusCodes.TOO_MANY_REQUESTS]: jsonContent(
    failWithErrorSchema,
    'Rate limit: too many requests.',
  ),
} satisfies Responses;
