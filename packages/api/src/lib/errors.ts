/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type Context } from 'node:vm';

import {
  type ClientErrorStatusCode,
  type ServerErrorStatusCode,
} from 'hono/utils/http-status';
import { type z } from 'zod';

import { type errorSchema } from '../utils/schema/common-schemas';
import { HttpStatusPhrases } from './constants';
import { getLogIdContext } from './context';

export type HttpErrorStatus = ClientErrorStatusCode | ServerErrorStatusCode;

export type Severity = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export type EventData = Readonly<
  Record<string, number | string | boolean | null>
>;

export type ErrorType = z.infer<typeof errorSchema> & {
  eventData?: EventData;
  name?: Error['name'];
};

// Create error object and log it if needed
export const createError = (
  c: Context,
  status: HttpErrorStatus,
  severity: Severity = 'info',
  eventData?: EventData,
  err?: Error,
) => {
  const logId = getLogIdContext();
  let message;

  switch (status) {
    case 400: {
      message = HttpStatusPhrases.BAD_REQUEST;
      break;
    }
    case 401: {
      message = HttpStatusPhrases.UNAUTHORIZED;
      break;
    }
    case 403: {
      message = HttpStatusPhrases.FORBIDDEN;
      break;
    }
    case 404: {
      message = HttpStatusPhrases.NOT_FOUND;
      break;
    }
    case 409: {
      message = HttpStatusPhrases.CONFLICT;
      break;
    }
    case 422: {
      message = HttpStatusPhrases.UNPROCESSABLE_ENTITY;
      break;
    }
    case 429: {
      message = HttpStatusPhrases.TOO_MANY_REQUESTS;
      break;
    }
    case 500: {
      message = HttpStatusPhrases.INTERNAL_SERVER_ERROR;
      break;
    }
    default: {
      message = 'Unknown error.';
      break;
    }
  }

  const error: ErrorType = {
    message,
    status,
    severity,
    logId,
    path: c.req.path,
    method: c.req.method,
  };

  if (err ?? ['warn', 'error'].includes(severity)) {
    const data = { ...error, eventData };
    console.error(err ?? data);
  }
  // Log significant events with additional data
  else if (eventData) {
    console.error(message, eventData, severity);
  }

  return error;
};

// Return error as http response
export const errorResponse = (
  c: Context,
  status: HttpErrorStatus,
  severity: Severity = 'info',
  eventData?: EventData,
  err?: Error,
) => {
  const error: ErrorType = createError(c, status, severity, eventData, err);

  return c.json({ success: false, error }, status);
};
