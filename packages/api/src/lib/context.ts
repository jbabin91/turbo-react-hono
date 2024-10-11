import { getContext } from 'hono/context-storage';

import { type AppBindings } from '../types/app';

export function getLogIdContext() {
  return getContext<AppBindings>().var.logId;
}

export function getLoggerContext() {
  return getContext<AppBindings>().var.logger;
}

export function getUserContext() {
  return getContext<AppBindings>().var.user;
}
