import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { config } from '@repo/core';
import { db, sessions, type UnsafeUser, users } from '@repo/db';
import { Lucia, type SessionCookieOptions, TimeSpan } from 'lucia';

import env from '../env';

const isProduction = env.NODE_ENV === 'production';
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

const sessionCookie = {
  name: `${config.slug}-session`,
  attributes: {
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction,
  },
  expires: true,
} satisfies SessionCookieOptions;

export const lucia = new Lucia(adapter, {
  sessionCookie,
  sessionExpiresIn: new TimeSpan(4, 'w'),
  getUserAttributes: ({ hashedPassword: _, ...attributes }) => {
    return {
      id: attributes.id,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      name: attributes.name,
      email: attributes.email,
      role: attributes.role,
    };
  },
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UnsafeUser;
  }
}
