import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/lib/api-client';

type GetTasksParams = Omit<
  Parameters<(typeof apiClient)['tasks']['$get']>['0']['query'],
  'limit' | 'offset'
> & {
  limit?: number;
  offset?: number;
  page?: number;
};

export async function getTasks(
  {
    q,
    sort = 'id',
    order = 'asc',
    page = 0,
    limit = 5,
    done,
    offset,
  }: GetTasksParams,
  signal?: AbortSignal,
) {
  const response = await apiClient.tasks.$get(
    {
      query: {
        done,
        limit: String(limit),
        offset:
          typeof offset === 'number' ? String(offset) : String(page * limit),
        order,
        q,
        sort,
      },
    },
    {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        return fetch(input, {
          ...init,
          credentials: 'include',
          signal,
        });
      },
    },
  );
  const { data } = await handleResponse(response);
  return data;
}

export function tasksQueryOptions({
  q,
  sort: initialSort,
  order: initialOrder,
  done,
  limit = 10,
  rowsLength = 0,
}: GetTasksParams & {
  rowsLength?: number;
}) {
  const sort = initialSort ?? 'createdAt';
  const order = initialOrder ?? 'desc';

  return infiniteQueryOptions({
    queryFn: async ({ pageParam: page, signal }) =>
      await getTasks(
        {
          done,
          // If some items were added, offset should be undefined, otherwise it should be the length of the rows
          limit: limit + Math.max(page * limit - rowsLength, 0),
          // Fetch more items than the limit if some items were deleted
          offset: rowsLength - page * limit > 0 ? undefined : rowsLength,
          order,
          page,
          q,
          sort,
        },
        signal,
      ),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    queryKey: ['tasks', q, sort, order, done, limit, rowsLength],
  });
}

type UseTasksQueryOptions = GetTasksParams & {
  rowsLength?: number;
};

export function useTasks(options: UseTasksQueryOptions = {}) {
  return useInfiniteQuery({
    ...tasksQueryOptions(options),
  });
}
