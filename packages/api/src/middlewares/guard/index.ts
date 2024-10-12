import { type Context } from 'node:vm';

import { type Next } from 'hono';
import { every } from 'hono/combine';
import { createMiddleware } from 'hono/factory';

import { getUserContext } from '../../lib/context';
import { errorResponse } from '../../lib/errors';

// System admin is a user with the 'admin' role in the users table.
export async function isSystemAdmin(
  ctx: Context,
  next: Next,
): Promise<Response | undefined> {
  const user = getUserContext();

  const isSystemAdmin = user?.role.includes('admin');
  if (!isSystemAdmin)
    return errorResponse(ctx, 403, 'warn', {
      user: user.id,
    });

  await next();
}

// Combine system admin check with IP restriction.
export const systemGuard = every(
  isSystemAdmin,
  // ipRestriction(getConnInfo, { allowList }, (_, c) => {
  //   return errorResponse(c, 403, 'warn');
  // }),
);

// Public access is a placeholder for routes accessible to everyone.
export const isPublicAccess = createMiddleware(async (_, next) => {
  await next();
});

// isAuthenticated is a middleware that checks if the user is authenticated.
export { isAuthenticated } from './is-authenticated';
