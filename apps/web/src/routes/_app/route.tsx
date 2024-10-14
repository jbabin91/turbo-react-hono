import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { meQueryOptions } from '@/features/users';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context: { queryClient }, location }) => {
    const user = queryClient.getQueryData(meQueryOptions().queryKey);
    if (!user) {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/sign-in',
      });
    }
  },
  component: AppLayout,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(meQueryOptions()),
});

function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
