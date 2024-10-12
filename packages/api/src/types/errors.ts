import {
  type ClientErrorStatusCode,
  type ServerErrorStatusCode,
} from 'hono/utils/http-status';
import { type z } from 'zod';

import { type errorSchema } from '../utils/schema/common-schemas';

export type HttpErrorStatus = ClientErrorStatusCode | ServerErrorStatusCode;

export type Severity = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export type EventData = Readonly<
  Record<string, number | string | boolean | null>
>;

export type ErrorType = z.infer<typeof errorSchema> & {
  eventData?: EventData;
  name?: Error['name'];
};
