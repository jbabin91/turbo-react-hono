import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const verifications = pgTable('verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
});
