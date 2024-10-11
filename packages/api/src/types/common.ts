import { type z } from 'zod';

import { type failWithErrorSchema } from '../utils/schema/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ErrorResponse = z.infer<typeof failWithErrorSchema>;
