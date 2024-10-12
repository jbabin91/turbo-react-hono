import { createRouter, RouterProvider } from '@tanstack/react-router';

import { DefaultCatchBoundary, NotFound } from './components/errors';
import { queryClient } from './lib/query-client.ts';
import { routeTree } from './routeTree.gen.ts';

// Create a new router instance
const router = createRouter({
  context: {
    queryClient,
  },
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: () => <NotFound />,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  routeTree,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
