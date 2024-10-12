import { lucia } from '@repo/auth';
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';

import { HttpStatusCodes } from '../../lib/constants';
import { getUserContext } from '../../lib/context';
import { createError, errorResponse, type ErrorType } from '../../lib/errors';
import { logEvent } from '../../middlewares/logger';
import { type AppRouteHandler } from '../../types/app';
import { removeSessionCookie } from '../auth/helpers/cookies';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import {
  type GetSelfRoute,
  type RemoveRoute,
  type RemoveSessionRoute,
  type UpdateSelfRoute,
} from './me.routes';

export const getSelf: AppRouteHandler<GetSelfRoute> = (c) => {
  const user = getUserContext();

  return c.json({ success: true, data: user }, HttpStatusCodes.OK);
};

export const updateSelf: AppRouteHandler<UpdateSelfRoute> = async (c) => {
  const user = getUserContext();

  if (!user) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn', {
      user: 'self',
    });
  }

  const { email, firstName, lastName } = c.req.valid('json');

  const [updatedSelf] = await db
    .update(users)
    .set({
      email: email?.toLowerCase(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    })
    .where(eq(users.id, user.id))
    .returning();

  if (!updatedSelf) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  logEvent('User updated', { user: updatedSelf.id });

  return c.json(
    { success: true, data: transformDatabaseUser(updatedSelf) },
    HttpStatusCodes.OK,
  );
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = getUserContext();

  // Check if user exists
  if (!user) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn', {
      user: 'self',
    });
  }

  // Delete user
  await db.delete(users).where(eq(users.id, user.id));

  // Invalidate sessions
  await lucia.invalidateUserSessions(user.id);
  removeSessionCookie(c);

  logEvent('User deleted', { user: user.id });

  return c.json({ success: true }, HttpStatusCodes.OK);
};

export const removeSession: AppRouteHandler<RemoveSessionRoute> = async (c) => {
  const { ids } = c.req.valid('query');

  const sessionIds = Array.isArray(ids) ? ids : [ids];

  const cookieHeader = c.req.raw.headers.get('Cookie');
  const currentSessionId = lucia.readSessionCookie(cookieHeader ?? '');

  const errors: ErrorType[] = [];

  await Promise.all(
    sessionIds.map(async (id) => {
      try {
        if (id === currentSessionId) {
          removeSessionCookie(c);
        }
        await lucia.invalidateSession(id);
      } catch {
        errors.push(
          createError(c, HttpStatusCodes.NOT_FOUND, 'warn', { session: id }),
        );
      }
    }),
  );

  return c.json({ success: true, errors }, HttpStatusCodes.OK);
};
