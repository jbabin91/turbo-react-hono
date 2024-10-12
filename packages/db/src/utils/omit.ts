import { type PgTableWithColumns, type TableConfig } from 'drizzle-orm/pg-core';

export function omitKeys<T extends TableConfig, K extends keyof T['columns']>(
  obj: PgTableWithColumns<T>,
  keys: K[],
) {
  const newObj = { ...obj };
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
}
