import base from '@repo/eslint-config/base.js';

export default [
  ...base,
  {
    ignores: ['apps/**', 'packages/**', 'configs/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
