import { type z } from 'zod';

import { type failWithErrorSchema } from '../utils/schema/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ErrorResponse = z.infer<typeof failWithErrorSchema>;
