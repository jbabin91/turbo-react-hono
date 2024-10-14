import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { meQueryOptions } from '@/features/users';

const fallback = '/tasks';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ context: { queryClient }, search }) => {
    const user = queryClient.getQueryData(meQueryOptions().queryKey);
    if (user) throw redirect({ to: search.redirect ?? fallback });
  },
});

function AuthLayout() {
  return (
    <div className="mx-auto mt-4 w-full max-w-sm">
      <Outlet />
    </div>
  );
}
