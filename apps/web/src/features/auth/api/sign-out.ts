import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { meQueryOptions } from '@/features/users';
import { apiClient, handleResponse } from '@/lib/api-client';

export async function signOut() {
  const response = await apiClient.auth['sign-out'].$post();
  const { success } = await handleResponse(response);
  return success;
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(meQueryOptions().queryKey, undefined);
      queryClient.clear();
      router.invalidate();
      toast.success('Signed out successfully');
    },
  });
}
