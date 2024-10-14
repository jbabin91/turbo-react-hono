import { ModeToggle } from '@repo/ui';
import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';
import { useSignOut } from '@/features/auth';
import { meQueryOptions } from '@/features/users';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { queryClient } = Route.useRouteContext();
  const user = queryClient.getQueryData(meQueryOptions().queryKey);
  const { mutate: signOut } = useSignOut();
  const navigate = Route.useNavigate();
  const location = useLocation();

  function handleSignOut() {
    void signOut(undefined, {
      onSuccess: () =>
        void navigate({
          search: { redirect: location.href },
          to: '/sign-in',
        }),
    });
  }

  return (
    <>
      <header className="flex justify-between border-b p-2">
        <nav className="flex items-center gap-2 p-2">
          <Link
            className="hover:underline [&.active]:font-bold [&.active]:hover:no-underline"
            to="/"
          >
            Home
          </Link>
          {user ?
            <Link
              className="hover:underline [&.active]:font-bold [&.active]:hover:no-underline"
              to="/tasks"
            >
              Tasks
            </Link>
          : null}
          <Link
            className="hover:underline [&.active]:font-bold [&.active]:hover:no-underline"
            to="/about"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ?
            <Link onClick={handleSignOut}>Sign out</Link>
          : <div className="flex gap-2 p-2">
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          }
          <ModeToggle />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
