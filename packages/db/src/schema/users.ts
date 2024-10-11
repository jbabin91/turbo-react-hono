import { generateId } from '@repo/core';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text().primaryKey().$defaultFn(generateId),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().default(false),
  image: text(),
  createdAt: timestamp({ mode: 'date', withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
