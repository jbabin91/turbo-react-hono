/* eslint-disable sort-keys-fix/sort-keys-fix */
import { config } from '@repo/core';
import { apiReference } from '@scalar/hono-api-reference';

import packageJson from '../../package.json' with { type: 'json' };
import env from '../env';
import { type AppOpenAPI } from '../types/app';

const isProduction = env.NODE_ENV === 'production';

export const commonRoutes = {
  general: {
    name: 'General',
    description: 'General endpoints that do not fit in any other module.',
  },
  tasks: {
    name: 'Tasks',
    description: 'Tasks endpoints are used to manage tasks.',
  },
} as const;

export default function configureOpenAPI(app: AppOpenAPI) {
  const version = packageJson.version;

  const registry = app.openAPIRegistry;

  registry.registerComponent('securitySchemes', 'cookieAuth', {
    type: 'apiKey',
    in: 'cookie',
    name: `${config.slug}-session-${version}`,
    description:
      "Authentication cookie. Copy the cookie from your network tab and paste it here. If you don't have it, you need to sign in or sign up first.",
  });

  const tags = Object.values(commonRoutes);

  app.doc31('/openapi.json', {
    servers: isProduction ? [{ url: config.backendUrl }] : undefined,
    info: {
      title: `${config.name} API`,
      description: `${config.name} API documentation.`,
      version,
    },
    openapi: '3.1.0',
    tags,
    security: [{ cookieAuth: [] }],
  });

  app.get(
    '/docs',
    apiReference({
      defaultHttpClient: {
        clientKey: 'fetch',
        targetKey: 'javascript',
      },
      layout: 'classic',
      spec: {
        url: '/openapi.json',
      },
      theme: 'kepler',
    }),
  );
}
