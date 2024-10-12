import { lucia } from '@repo/auth';
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';

import { HttpStatusCodes } from '../../lib/constants';
import { errorResponse } from '../../lib/errors';
import { logEvent } from '../../middlewares/logger';
import { type AppRouteHandler } from '../../types/app';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import {
  type SignInRoute,
  type SignOutRoute,
  type SignUpRoute,
} from './auth.routes';
import { argon2 } from './helpers/argon2';
import { removeSessionCookie, setSessionCookie } from './helpers/cookies';

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const data = c.req.valid('json');

  // Hashed password
  const hashedPassword = await argon2.hash(data.password);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email.toLowerCase()),
  });

  if (existingUser) {
    return errorResponse(c, HttpStatusCodes.CONFLICT, 'warn');
  }

  // Create user
  const [user] = await db
    .insert(users)
    .values({
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      hashedPassword,
    })
    .returning();

  if (user) await setSessionCookie(c, user.id, 'password');

  return c.json(
    { success: true, data: transformDatabaseUser(user!) },
    HttpStatusCodes.OK,
  );
};

export const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password } = c.req.valid('json');

  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });

  // If the user is not found
  if (!user) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  // Verify password
  const validPassword = await argon2.verify(user.hashedPassword, password);

  // If the password is invalid
  if (!validPassword) {
    return errorResponse(c, HttpStatusCodes.BAD_REQUEST, 'warn');
  }

  // Set Session Cookie
  await setSessionCookie(c, user.id, 'password');

  return c.json({ success: true, data: transformDatabaseUser(user) });
};

export const signOut: AppRouteHandler<SignOutRoute> = async (c) => {
  const cookieHeader = c.req.raw.headers.get('Cookie');
  const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

  if (!sessionId) {
    removeSessionCookie(c);
    return errorResponse(c, HttpStatusCodes.UNAUTHORIZED, 'warn');
  }

  const { session } = await lucia.validateSession(sessionId);

  if (session) {
    await lucia.invalidateSession(session.id);
  }

  removeSessionCookie(c);
  logEvent('User signed out', { user: session?.userId ?? 'n/a' });

  return c.json({ success: true });
};
