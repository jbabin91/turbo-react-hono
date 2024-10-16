import {
  type OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from '@hono/zod-openapi';
import { type User } from '@repo/db';
import { type PinoLogger } from 'hono-pino';

// Middleware env is app-specific
export type AppBindings = {
  Variables: {
    logId: string;
    logger: PinoLogger;
    user: User;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
