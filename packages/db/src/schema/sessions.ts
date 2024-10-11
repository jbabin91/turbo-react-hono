import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { users } from './users';

export const sessions = pgTable(
  'sessions',
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    adminUserId: text().references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp({ mode: 'date', withTimezone: true }).notNull(),
    createdAt: timestamp({ mode: 'date', withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      adminUserIdIndex: index().on(table.adminUserId),
    };
  },
);

export const selectSessionSchema = createSelectSchema(sessions);
export const insertSessionSchema = createInsertSchema(sessions);

export type Session = z.infer<typeof selectSessionSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;
