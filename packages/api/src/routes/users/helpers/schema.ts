import { config } from '@repo/core';
import { z } from 'zod';

import { paginationQuerySchema } from '../../../utils/schema/common-schemas';

export const usersQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'name', 'email', 'role', 'createdAt'])
      .default('createdAt')
      .optional(),
    role: z.enum(config.rolesByType.systemRoles).default('user').optional(),
  }),
);
