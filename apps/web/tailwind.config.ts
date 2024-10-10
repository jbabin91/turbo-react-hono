import tailwindConfig from '@repo/ui/tailwind-theme';
import { type Config } from 'tailwindcss';

export default {
  ...tailwindConfig,
  content: [
    './index.html',
    './src/**/*.{jsx,tsx}',
    './node_modules/@repo/ui/src/**/*.{jsx,tsx}',
  ],
} satisfies Config;
