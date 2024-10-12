import { lucia } from '@repo/auth';
import { db, users } from '@repo/db';
import { and, count, eq, ilike, inArray, or } from 'drizzle-orm';

import { HttpStatusCodes } from '../../lib/constants';
import { getUserContext } from '../../lib/context';
import { createError, errorResponse, type ErrorType } from '../../lib/errors';
import { logEvent } from '../../middlewares/logger';
import { type AppRouteHandler } from '../../types/app';
import { getOrderColumn } from '../../utils/order-column';
import { removeSessionCookie } from '../auth/helpers/cookies';
import { getUsersByConditions } from './helpers/get-user';
import { transformDatabaseUser } from './helpers/transform-database-user';
import {
  type GetOneRoute,
  type ListRoute,
  type PatchRoute,
  type RemoveRoute,
} from './users.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { q, sort, order, offset, limit, role } = c.req.valid('query');

  const orderColumn = getOrderColumn(
    {
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    },
    sort,
    users.id,
    order,
  );

  const filters = [];
  if (q) {
    filters.push(or(ilike(users.name, `%${q}%`), ilike(users.email, `%${q}%`)));
  }
  if (role) filters.push(eq(users.role, role));

  const usersQuery = await db.query.users.findMany({
    where: filters.length > 0 ? and(...filters) : undefined,
    orderBy: orderColumn,
    limit: Number(limit),
    offset: Number(offset),
  });

  const [results] = await db.select({ total: count() }).from(users);

  const items = usersQuery.map((user) => transformDatabaseUser(user));

  return c.json(
    { success: true, data: { items, total: results?.total ?? 0 } },
    HttpStatusCodes.OK,
  );
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  return c.json({ success: true, data: user }, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
    return errorResponse(c, HttpStatusCodes.UNPROCESSABLE_ENTITY, 'warn');
  }

  const [user] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, id))
    .returning();

  if (!user) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  return c.json({ success: true, data: user });
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { ids } = c.req.valid('query');
  const user = getUserContext();

  // Convert the user ids to an array
  const userIds = Array.isArray(ids) ? ids : [ids];

  const errors: ErrorType[] = [];

  // Get the users
  const targets = await getUsersByConditions([inArray(users.id, userIds)]);

  // Check if the users exist
  for (const id of userIds) {
    if (!targets.some((target) => target.id === id)) {
      errors.push(
        createError(c, HttpStatusCodes.NOT_FOUND, 'warn', { user: id }),
      );
    }
  }

  // Filter out users that the user doesn't have permission to delete
  const allowedTargets = targets.filter((target) => {
    const userId = target.id;

    if (user.role !== 'admin' && user.id !== userId) {
      errors.push(
        createError(c, HttpStatusCodes.FORBIDDEN, 'warn', { user: userId }),
      );
      return false;
    }

    return true;
  });

  // If the user doesn't have permission to delete any of the users, return an error
  if (allowedTargets.length === 0) {
    return c.json({ success: false, errors }, HttpStatusCodes.OK);
  }

  // Delete the users
  await db.delete(users).where(
    inArray(
      users.id,
      allowedTargets.map((target) => target.id),
    ),
  );

  for (const { id } of allowedTargets) {
    // Invalidate the user's sessions if the user is deleting themselves
    if (user.id === id) {
      await lucia.invalidateUserSessions(user.id);
      removeSessionCookie(c);
    }

    logEvent(`User deleted: ${JSON.stringify({ user: id })}`);
  }

  return c.json({ success: true, errors }, HttpStatusCodes.OK);
};
