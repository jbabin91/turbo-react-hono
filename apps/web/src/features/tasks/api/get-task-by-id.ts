import { queryOptions, useQuery } from '@tanstack/react-query';
import { type InferRequestType } from 'hono';

import { apiClient, handleResponse } from '@/lib/api-client';

type GetTaskByIdParams = InferRequestType<
  (typeof apiClient)['tasks'][':id']['$get']
>['param'];

export async function getTaskById(param: GetTaskByIdParams) {
  const response = await apiClient.tasks[':id'].$get({
    param,
  });
  const { data } = await handleResponse(response);
  return data;
}

export function taskQueryOptions({ id }: GetTaskByIdParams) {
  return queryOptions({
    queryFn: () => getTaskById({ id }),
    queryKey: ['tasks', id],
  });
}

export function useTask(param: GetTaskByIdParams) {
  return useQuery({
    ...taskQueryOptions(param),
  });
}
