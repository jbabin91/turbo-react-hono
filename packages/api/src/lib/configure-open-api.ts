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
  auth: {
    name: 'Auth',
    description: 'Auth endpoints are used to manage authentication.',
  },
  me: {
    name: 'Me',
    description: 'Me endpoints are used to manage the current user.',
  },
  tasks: {
    name: 'Tasks',
    description: 'Tasks endpoints are used to manage tasks.',
  },
  users: {
    name: 'Users',
    description: 'Users endpoints are used to manage users.',
  },
} as const;

export default function configureOpenAPI(app: AppOpenAPI) {
  const version = packageJson.version;

  const registry = app.openAPIRegistry;

  registry.registerComponent('securitySchemes', 'cookieAuth', {
    type: 'apiKey',
    in: 'cookie',
    name: `${config.slug}-session`,
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
