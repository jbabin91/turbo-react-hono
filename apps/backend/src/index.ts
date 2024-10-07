import { app } from '@repo/api';

import env from '@/env';

export default {
  fetch: app.fetch,
  port: env?.PORT,
};
