import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '../env';

export function pinoLogger() {
  return logger({
    http: {
      reqId: () => crypto.randomUUID(),
    },
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV === 'production' ? undefined : pretty(),
    ),
  });
}
