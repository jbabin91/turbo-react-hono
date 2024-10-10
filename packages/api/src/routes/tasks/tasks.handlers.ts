import { db, tasks } from '@repo/db';
import { eq } from 'drizzle-orm';

import { HttpStatusCodes } from '../../lib/constants';
import { errorResponse } from '../../lib/errors';
import { type AppRouteHandler } from '../../types/app';
import {
  type CreateRoute,
  type GetOneRoute,
  type ListRoute,
  type PatchRoute,
  type RemoveRoute,
} from './tasks.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json({ success: true, data: tasks }, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json');
  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json({ success: true, data: inserted! }, HttpStatusCodes.CREATED);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where: (fields, operators) => operators.eq(fields.id, id),
  });

  if (!task) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  return c.json({ success: true, data: task }, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
    return errorResponse(c, HttpStatusCodes.UNPROCESSABLE_ENTITY, 'warn');
  }

  const [task] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  return c.json({ success: true, data: task });
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const [result] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

  if (!result) {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
