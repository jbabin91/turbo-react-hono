import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { type InferRequestType } from 'hono';

import { apiClient, handleResponse } from '@/lib/api-client';

import { taskQueryOptions } from './get-task-by-id';

type UpdateTaskParams = InferRequestType<
  (typeof apiClient)['tasks'][':id']['$patch']
>;

export async function updateTask({ param, json }: UpdateTaskParams) {
  const response = await apiClient.tasks[':id'].$patch({
    param,
    json,
  });
  const { data } = await handleResponse(response);
  return data;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update task', {
        description: 'Please try again later',
      });
    },
    onSuccess: (data, { param }) => {
      queryClient.setQueryData(taskQueryOptions(param).queryKey, data);
      router.invalidate();
      toast.success('Task updated successfully');
    },
  });
}
