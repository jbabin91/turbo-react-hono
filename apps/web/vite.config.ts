import { fileURLToPath } from 'node:url';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        manualChunks: {
          react: ['react', 'react-dom'],
          'tanstack.query': [
            '@tanstack/react-query',
            '@tanstack/react-query-devtools',
          ],
          'tanstack.router': [
            '@tanstack/react-router',
            '@tanstack/router-devtools',
          ],
          ui: ['@repo/ui'],
        },
      },
    },
  },
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  preview: {
    port: 5173,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('src', import.meta.url)),
      },
    ],
  },
  server: {
    port: 5173,
  },
});
