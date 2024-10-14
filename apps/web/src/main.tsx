import '@/styles/globals.css';

import { TailwindIndicator, Toaster } from '@repo/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App.tsx';
import { Providers } from '@/providers';

const rootElement = document.querySelector('#root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Providers>
        <App />
        <Toaster />
        <TailwindIndicator />
      </Providers>
    </StrictMode>,
  );
}
