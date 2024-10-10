import { getContext } from 'hono/context-storage';

import { type AppBindings } from '../types/app';

export function getLoggerContext() {
  return getContext<AppBindings>().var.logger;
}
