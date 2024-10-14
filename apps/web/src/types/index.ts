import { type InferResponseType } from 'hono';

import { type apiClient } from '@/lib/api-client';

export type * from './navigation.ts';

export type User = Extract<
  InferResponseType<(typeof apiClient.users)[':id']['$get']>,
  { data: unknown }
>['data'];
