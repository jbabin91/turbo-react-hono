import { z } from 'zod';

import { paginationQuerySchema } from '@/utils/common-schema';

export const usersQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'name', 'email', 'role', 'createdAt'])
      .default('createdAt')
      .optional(),
    role: z.enum(['user', 'admin']).default('user').optional(),
  }),
);
