import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const accounts = pgTable('account', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  expiresAt: timestamp({ mode: 'date', withTimezone: true }),
  password: text(),
});
