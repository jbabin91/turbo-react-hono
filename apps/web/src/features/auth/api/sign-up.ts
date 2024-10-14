import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';

import { meQueryOptions } from '@/features/users/api';
import { apiClient, handleResponse } from '@/lib/api-client';

export const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export async function signUp(json: z.infer<typeof signUpSchema>) {
  const response = await apiClient.auth['sign-up'].$post({
    json,
  });
  const { data } = await handleResponse(response);
  return data;
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(meQueryOptions().queryKey, data);
      router.invalidate();
      toast.success('Signed up successfully');
    },
  });
}
