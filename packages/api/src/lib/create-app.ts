import { OpenAPIHono } from '@hono/zod-openapi';
import { generateId } from '@repo/core';
import { contextStorage } from 'hono/context-storage';
import { defaultHook } from 'stoker/openapi';

import middlewares from '../middlewares';
import { type AppBindings, type AppOpenAPI } from '../types/app';
import { HttpStatusCodes } from './constants';
import { errorResponse } from './errors';

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

  app.notFound((c) => {
    return errorResponse(c, HttpStatusCodes.NOT_FOUND, 'warn');
  });
  app.onError((c) => {
    return errorResponse(c, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'error');
  });
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
