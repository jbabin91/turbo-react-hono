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
  {
    files: ['**/env.ts'],
    rules: {
      'unicorn/no-process-exit': 'off',
    },
  },
  {
    files: ['**/db.ts'],
    rules: {
      'unicorn/no-await-expression-member': 'off',
    },
  },
  {
    files: ['**/schema/**/*.ts'],
    rules: {
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },
];
