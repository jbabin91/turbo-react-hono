import { config } from '@repo/core';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { serveEmojiFavicon } from 'stoker/middlewares';

import { createRouter } from '../lib/create-app';
import { pinoLogger } from './logger';

const app = createRouter();

// Secure headers
app.use(secureHeaders());

// Logger
app.use(pinoLogger());

// CORS
app.use(
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// CSRF protection
app.use(csrf({ origin: [config.frontendUrl, config.backendUrl] }));

// Setup favicon
app.use(serveEmojiFavicon('🔥'));

// Health check
app.get('/ping', (c) => c.text('pong'));

export default app;
