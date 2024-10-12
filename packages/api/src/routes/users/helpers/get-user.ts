import {
  db,
  safeUserSelect,
  type UnsafeUser,
  type User,
  users,
} from '@repo/db';
import { and, eq, type SQL } from 'drizzle-orm';

type SafeQuery = typeof safeUserSelect;
type UnsafeQuery = typeof users;

type SafeField = Extract<keyof SafeQuery, keyof SafeQuery['_']['columns']>;
type UnsafeField = Extract<
  keyof UnsafeQuery,
  keyof UnsafeQuery['_']['columns']
>;

// Overload signatures
export function getUserBy(
  field: SafeField,
  value: string,
): Promise<User | null>;
export function getUserBy(
  field: UnsafeField,
  value: string,
  type: 'unsafe',
): Promise<UnsafeUser | null>;

export async function getUserBy(
  field: SafeField | UnsafeField,
  value: string,
  type?: 'unsafe' | 'safe',
) {
  const select = type === 'unsafe' ? users : safeUserSelect;

  // Execute a database query to select the user based on the given field and value
  const [result] = await db
    .select({ user: select })
    .from(users)
    .where(eq(users[field], value));

  return result?.user ?? null;
}

export async function getUsersByConditions(
  whereArray: (SQL<unknown> | undefined)[],
  type?: 'unsafe' | 'safe',
) {
  const select = type === 'unsafe' ? users : safeUserSelect;

  // Execute a database query to select users based on the conditions in 'whereArray'.
  const result = await db
    .select({ user: select })
    .from(users)
    .where(and(...whereArray));

  return result.map((el) => el.user);
}
