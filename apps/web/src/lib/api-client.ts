import { type AppTypes, type ErrorType } from '@repo/api';
import { type ClientResponse, hc } from 'hono/client';

import { env } from '@/configs';

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

export async function handleResponse<
  T extends Record<string, any>,
  U extends ClientResponse<T, number, 'json'>,
>(response: U) {
  if (response.ok) {
    const json = await response.json();
    return json as Awaited<ReturnType<Extract<U, { status: 200 }>['json']>>;
  }

  const json = await response.json();
  if ('error' in json) throw new ApiError(json.error);
  throw new Error('Unknown error');
}

const clientConfig = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: 'include',
    }),
};

export const apiClient = hc<AppTypes>(env.VITE_API_URL, clientConfig);
