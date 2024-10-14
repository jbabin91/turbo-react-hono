import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/lib/api-client';

export async function getMe() {
  const response = await apiClient.me.$get();
  const { data } = await handleResponse(response);
  return data;
}

export function meQueryOptions() {
  return queryOptions({
    gcTime: Infinity,
    queryFn: getMe,
    queryKey: ['me'],
    staleTime: Infinity,
  });
}

export function useMe() {
  return useQuery({
    ...meQueryOptions(),
  });
}
