import { sql } from 'drizzle-orm';
import {
  drizzle as pgDrizzle,
  type NodePgDatabase,
} from 'drizzle-orm/node-postgres';
import {
  drizzle as pgliteDrizzle,
  type PgliteClient,
  type PgliteDatabase,
} from 'drizzle-orm/pglite';
import { Pool } from 'pg';

import env from './env';
import * as schema from './schema';

// const dbClient = await drizzle('node-postgres', env.DATABASE_URL);

export const queryClient = env.PGLITE
  ? await (
      await import('@electric-sql/pglite')
    ).PGlite.create({
      dataDir: './.db',
    })
  : new Pool({
      connectionString: env.DATABASE_URL,
      connectionTimeoutMillis: 10_000,
    });

const dbConfig = {
  logger: env.NODE_ENV === 'development',
  // schema,
};

export const db:
  | (NodePgDatabase<typeof schema> & {
      $client: Pool;
    })
  | (PgliteDatabase<typeof schema> & {
      $client: PgliteClient;
    }) =
  queryClient instanceof Pool
    ? pgDrizzle(queryClient, { ...dbConfig, schema })
    : pgliteDrizzle(queryClient, { ...dbConfig, schema });

export const coalesce = <T>(column: T, value: number) =>
  sql`COALESCE(${column}, ${value})`.mapWith(Number);
