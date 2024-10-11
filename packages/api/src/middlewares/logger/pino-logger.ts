import { generateId } from '@repo/core';
import { type MiddlewareHandler } from 'hono';
import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '../../env';

export function pinoLogger(): MiddlewareHandler {
  return logger({
    http: {
      reqId: generateId,
    },
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV === 'production' ? undefined : pretty(),
    ),
  });
}
