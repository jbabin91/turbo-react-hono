export const config = {
  mode: 'development',
  name: 'Turbo React Hono',
  slug: 'turbo-react-hono',

  debug: false,
  maintenance: false,

  domain: 'jacebabin.com',
  frontendUrl: 'http://localhost:5173',
  backendUrl: 'http://localhost:3001',

  rolesByType: {
    systemRoles: ['user', 'admin'] as const,
    entityRoles: ['member', 'admin'] as const,
    allRoles: ['user', 'member', 'admin'] as const,
  },
};

export default config;

export type DeepPartial<T> =
  T extends object ?
    {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Config = DeepPartial<typeof config>;
