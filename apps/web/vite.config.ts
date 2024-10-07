import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
        },
      },
    },
  },
  plugins: [react()],
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
