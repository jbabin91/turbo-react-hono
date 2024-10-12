import { ModeToggle } from '@repo/ui';
import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
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
          <Link
            className="hover:underline [&.active]:font-bold [&.active]:hover:no-underline"
            to="/about"
          >
            About
          </Link>
        </nav>
        <div>
          <ModeToggle />
        </div>
      </header>
      <main className="justify-center text-center">
        <Outlet />
      </main>
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
