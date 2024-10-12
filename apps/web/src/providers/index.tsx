import { ThemeProvider } from '@repo/ui';

import { TanstackQueryProvider } from './tanstack-query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  );
}
