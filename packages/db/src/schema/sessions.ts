import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const sessions = pgTable('session', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
  ipAddress: text(),
  userAgent: text(),
});
