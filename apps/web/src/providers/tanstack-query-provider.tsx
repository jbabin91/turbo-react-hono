import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { localStoragePersister, queryClient } from '@/lib/query-client';

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
