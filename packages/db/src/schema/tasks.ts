import { generateId } from '@repo/core';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from './users';

export const tasks = pgTable('tasks', {
  id: text().primaryKey().$defaultFn(generateId),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  authorId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const unsafeSelectTaskSchema = createSelectSchema(tasks);
export const selectTaskSchema = unsafeSelectTaskSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export const insertTaskSchema = createInsertSchema(tasks, {
  name: z.string().min(1),
  done: z.boolean().default(false),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const patchTaskSchema = insertTaskSchema.partial();

export type Task = z.infer<typeof selectTaskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type PatchTask = z.infer<typeof patchTaskSchema>;
