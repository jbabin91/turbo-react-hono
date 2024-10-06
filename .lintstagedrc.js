export default {
  // Type check TypeScript files
  '*.(ts|tsx)': () => 'pnpm typecheck',
  // Lint files
  '*.(ts|tsx|js|jsx)': (files) => `pnpm eslint ${files.join(' ')}`,
  // Format files
  '*.(ts|tsx|js|jsx|cjs|mjs|json|md|mdx)': (files) =>
    `pnpm prettier -uc ${files.join(' ')}`,
};
