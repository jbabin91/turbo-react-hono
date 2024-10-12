import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/query-client';

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
