import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

export const tasks = pgTable('tasks', {
  id: uuid().defaultRandom().notNull().primaryKey(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
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
export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const patchTaskSchema = insertTaskSchema.partial();

export type Task = z.infer<typeof selectTaskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type PatchTask = z.infer<typeof patchTaskSchema>;
