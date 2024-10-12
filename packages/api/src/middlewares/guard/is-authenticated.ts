import { lucia } from '@repo/auth';
import { createMiddleware } from 'hono/factory';

import { HttpStatusCodes } from '../../lib/constants';
import { errorResponse } from '../../lib/errors';
import { removeSessionCookie } from '../../routes/auth/helpers/cookies';

export const isAuthenticated = createMiddleware(async (c, next) => {
  const cookieHeader = c.req.raw.headers.get('Cookie');

  // Read the session ID from the session cookie
  const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

  // If no session ID is found, remove the session cookie
  if (!sessionId) {
    removeSessionCookie(c);
    return errorResponse(c, HttpStatusCodes.UNAUTHORIZED, 'warn');
  }

  const { session, user } = await lucia.validateSession(sessionId);

  // If session validation fails, remove the session cookie
  if (!session) {
    removeSessionCookie(c);
    return errorResponse(c, HttpStatusCodes.UNAUTHORIZED, 'warn');
  }

  // If the session is newly created, update the session cookie
  if (session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.header('Set-Cookie', sessionCookie.serialize());
  }

  c.set('user', user);

  await next();
});
