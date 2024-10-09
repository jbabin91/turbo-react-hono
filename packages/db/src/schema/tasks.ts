import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

export const tasks = pgTable('tasks', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const unsafeTasksSelectSchema = createSelectSchema(tasks);
export const tasksSelectSchema = unsafeTasksSelectSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export const tasksInsertSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const tasksUpdateSchema = tasksInsertSchema.partial();

export type Task = z.infer<typeof tasksSelectSchema>;
export type TaskInsert = z.infer<typeof tasksInsertSchema>;
export type TaskUpdate = z.infer<typeof tasksUpdateSchema>;
