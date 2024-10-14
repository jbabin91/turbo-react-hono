import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';

import { meQueryOptions } from '@/features/users';
import { apiClient, handleResponse } from '@/lib/api-client';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export async function signIn(json: z.infer<typeof signInSchema>) {
  const response = await apiClient.auth['sign-in'].$post({
    json,
  });
  const { data } = await handleResponse(response);
  return data;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onError: (error) => {
      console.error(error);
      toast.error('Failed to sign in', {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(meQueryOptions().queryKey, data);
      router.invalidate();
      toast.success('Signed in successfully');
    },
  });
}
