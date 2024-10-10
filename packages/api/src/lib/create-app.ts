import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { pinoLogger } from '../middlewares/pino-logger';
import { type AppBindings, type AppOpenAPI } from '../types/app';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon('🔥'));
  app.use(pinoLogger());
  app.use(contextStorage());
  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
