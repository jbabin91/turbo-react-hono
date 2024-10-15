import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { type InferRequestType } from 'hono';

import { apiClient, handleResponse } from '@/lib/api-client';

import { taskQueryOptions } from './get-task-by-id';

type DeleteTaskParam = InferRequestType<
  (typeof apiClient)['tasks'][':id']['$delete']
>['param'];

export async function deleteTask(param: DeleteTaskParam) {
  const response = await apiClient.tasks[':id'].$delete({
    param,
  });
  const data = await handleResponse(response);
  return data;
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete task', {
        description: 'Please try again later',
      });
    },
    onSuccess: (_, param) => {
      queryClient.setQueryData(taskQueryOptions(param).queryKey, undefined);
      queryClient.clear();
      router.invalidate();
      toast.success('Task deleted successfully');
    },
  });
}
