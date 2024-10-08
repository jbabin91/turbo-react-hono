import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});
