import createClient from 'openapi-fetch';
import type { paths } from './schema';

export const client = createClient<paths>({
  baseUrl: 'https://inctagram.work/api/v1/',
  credentials: 'include',
  headers: {},
});
