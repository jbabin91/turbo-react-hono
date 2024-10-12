import { getLoggerContext } from '../../lib/context';
import { type EventData, type Severity } from '../../types/errors';

export function logEvent(
  message: string,
  eventData?: EventData,
  severity: Severity = 'info',
) {
  const logger = getLoggerContext();
  logger[severity](`logEvent: ${message}`);
  if (eventData) logger[severity](`eventData: ${JSON.stringify(eventData)}`);
}

export { pinoLogger } from './pino-logger';
