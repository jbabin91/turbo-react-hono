import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    minify: !options.watch,
    splitting: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    dts: true,
    treeshake: true,
  };
});
