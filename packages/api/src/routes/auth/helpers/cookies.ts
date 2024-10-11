import { lucia } from '@repo/auth';
import { config } from '@repo/core';
import { type User } from '@repo/db';
import { type Context } from 'hono';
import { setCookie as baseSetCookie } from 'hono/cookie';

import env from '../../../env';
import { logEvent } from '../../../middlewares/pino-logger';

const isProduction = env.NODE_ENV === 'production';

export function setCookie(c: Context, name: string, value: string) {
  return baseSetCookie(c, name, value, {
    domain: isProduction ? config.domain : undefined,
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    path: '/',
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction, // set `Secure` flag in HTTPS
  });
}

export async function setSessionCookie(
  c: Context,
  userId: User['id'],
  strategy: string,
) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  logEvent('User signed in', { strategy, user: userId });

  c.header('Set-Cookie', sessionCookie.serialize());
}

export function removeSessionCookie(c: Context) {
  const sessionCookie = lucia.createBlankSessionCookie();
  c.header('Set-Cookie', sessionCookie.serialize());
}
