import { apiReference } from '@scalar/hono-api-reference';

import { version } from '../../package.json' with { type: 'json' };
import { type AppOpenAPI } from '../types/app';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/spec', {
    info: {
      title: 'TRH API',
      version,
    },
    openapi: '3.0.0',
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
        url: '/spec',
      },
      theme: 'kepler',
    }),
  );
}
