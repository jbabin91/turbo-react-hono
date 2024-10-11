import { createRoute, z } from '@hono/zod-openapi';
import { selectUserSchema } from '@repo/db';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import { commonRoutes } from '../../lib/configure-open-api';
import { HttpStatusCodes } from '../../lib/constants';
import {
  errorResponses,
  successWithoutDataSchema,
} from '../../utils/schema/common-responses';
import { cookieSchema } from '../../utils/schema/common-schemas';
import { signInSchema, signUpSchema } from './helpers/schema';

const tags = [commonRoutes.auth.name];

export const signUp = createRoute({
  path: '/auth/sign-up',
  method: 'post',
  tags,
  summary: 'Sign up with password',
  description: 'Sign up with email and password.',
  request: {
    body: jsonContentRequired(signUpSchema, "The user's information"),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      headers: z.object({
        'Set-Cookie': cookieSchema,
      }),
      ...jsonContent(selectUserSchema, 'The signed up user'),
    },
    ...errorResponses,
  },
});

export const signIn = createRoute({
  path: '/auth/sign-in',
  method: 'post',
  tags,
  summary: 'Sign in with email and password',
  description: 'Sign in with email and password.',
  request: {
    body: jsonContentRequired(signInSchema, "The user's login information"),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      headers: z.object({
        'Set-Cookie': cookieSchema,
      }),
      ...jsonContent(selectUserSchema, 'The signed in user'),
    },
    ...errorResponses,
  },
});

export const signOut = createRoute({
  path: '/auth/sign-out',
  method: 'post',
  tags,
  summary: 'Sign out the current user',
  description: 'Sign out the current user.',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successWithoutDataSchema,
      'The user has signed out',
    ),
    ...errorResponses,
  },
});

export type SignUpRoute = typeof signUp;
export type SignInRoute = typeof signIn;
export type SignOutRoute = typeof signOut;
