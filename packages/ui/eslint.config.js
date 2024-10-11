import base from '@repo/eslint-config/base.js';

export default [
  ...base,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.lint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
