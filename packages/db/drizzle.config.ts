import { defineConfig } from 'drizzle-kit';

import env from './src/env';

const extendConfig = env.PGLITE ? { driver: 'pglite' } : {};

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schema',
  ...extendConfig,
  dbCredentials: {
    url: env.PGLITE ? './.db' : env.DATABASE_URL,
  },
});
