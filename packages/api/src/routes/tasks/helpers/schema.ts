import { z } from 'zod';

import { paginationQuerySchema } from '../../../utils/schema/common-schemas';

export const tasksQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'name', 'done', 'createdAt'])
      .default('createdAt')
      .optional(),
    done: z.enum(['true', 'false']).default('false').optional(),
  }),
);
