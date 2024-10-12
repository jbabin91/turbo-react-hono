import { createMiddleware } from 'hono/factory';

// Public access is a placeholder for routes accessible to everyone.
export const isPublicAccess = createMiddleware(async (_, next) => {
  await next();
});

// isAuthenticated is a middleware that checks if the user is authenticated.
export { isAuthenticated } from './is-authenticated';
