import { OpenAPIHono } from '@hono/zod-openapi';
import { generateId } from '@repo/core';
import { contextStorage } from 'hono/context-storage';
import { notFound, onError } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import middlewares from '../middlewares';
import { type AppBindings, type AppOpenAPI } from '../types/app';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(contextStorage());
  app.use(async (c, next) => {
    const logId = generateId();
    c.set('logId', logId);
    return await next();
  });
  app.route('', middlewares);

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
