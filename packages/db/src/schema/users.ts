import { config, generateId } from '@repo/core';
import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const roleEnum = config.rolesByType.systemRoles;

export const users = pgTable(
  'users',
  {
    id: text().primaryKey().$defaultFn(generateId),
    firstName: text().notNull(),
    lastName: text().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    hashedPassword: text().notNull(),
    role: text({ enum: roleEnum }).notNull().default('user'),
    createdAt: timestamp({ mode: 'date', withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: 'date', withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      nameIndex: index().on(table.name.desc()),
      emailIndex: index().on(table.email.desc()),
      createdAtIndex: index().on(table.createdAt.desc()),
    };
  },
);

export const unsafeSelectUserSchema = createSelectSchema(users);
export const selectUserSchema = unsafeSelectUserSchema.omit({
  hashedPassword: true,
});
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  name: z.string().min(1),
  hashedPassword: z.string().min(1).min(8),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const patchUserSchema = insertUserSchema
  .omit({
    hashedPassword: true,
  })
  .partial();

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PatchUser = z.infer<typeof patchUserSchema>;
