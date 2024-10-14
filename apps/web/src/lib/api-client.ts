import { type AppTypes, type ErrorType } from '@repo/api';
import { hc } from 'hono/client';

export class ApiError extends Error {
  status: string | number;
  severity?: string;
  logId?: string;
  path?: string;
  method?: string;
  timestamp?: string;
  usr?: string;

  constructor(error: ErrorType) {
    super(error.message);
    this.status = error.status;
    this.severity = error.severity;
    this.logId = error.logId;
    this.path = error.path;
    this.method = error.method;
    this.timestamp = error.timestamp;
    this.usr = error.usr;
  }
}

const clientConfig = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: 'include',
    }),
};

export const apiClient = hc<AppTypes>('', clientConfig);
