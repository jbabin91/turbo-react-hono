import { z } from 'zod';

import { paginationQuerySchema } from '@/utils/common-schema';

export const tasksQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'name', 'done', 'createdAt'])
      .default('createdAt')
      .optional(),
    limit: z.string().default('10').optional(),
    done: z.enum(['true', 'false']).default('false').optional(),
  }),
);

const baseTasksSearchSchema = tasksQuerySchema.pick({
  q: true,
  sort: true,
  order: true,
  done: true,
});

export const tasksSearchSchema = z.object({
  ...baseTasksSearchSchema.shape,
  taskIdPreview: z.string().optional(),
});
