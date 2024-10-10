/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod';

export const passwordSchema = z.string().min(1).min(8).max(100);

export const cookieSchema = z.string();

export const idSchema = z.string();

export const idParamsSchema = z.object({
  id: idSchema,
});

export const errorSchema = z.object({
  message: z.string(),
  status: z.number(),
  severity: z.string(),
  logId: z.string().optional(),
  path: z.string().optional(),
  method: z.string().optional(),
  timestamp: z.string().optional(),
});

export const failWithErrorSchema = z.object({
  success: z.boolean().default(false),
  error: errorSchema,
});
