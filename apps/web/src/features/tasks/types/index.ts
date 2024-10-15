import { type InferResponseType } from 'hono';

import { type apiClient } from '@/lib/api-client';

export type Task = Extract<
  InferResponseType<(typeof apiClient.tasks)[':id']['$get']>,
  { data: unknown }
>['data'];
