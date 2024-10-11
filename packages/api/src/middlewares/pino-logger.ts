import { generateId } from '@repo/core';
import { type MiddlewareHandler } from 'hono';
import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '../env';
import { getLoggerContext } from '../lib/context';
import { type EventData, type Severity } from '../lib/errors';

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

export function logEvent(
  message: string,
  eventData?: EventData,
  severity: Severity = 'info',
) {
  const logger = getLoggerContext();
  logger[severity](`logEvent: ${message}`);
  if (eventData) logger[severity](`eventData: ${JSON.stringify(eventData)}`);
}
