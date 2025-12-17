import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { customFetch } from '@/shared/api/customFetch';

export const client = createClient<paths>({
  baseUrl: 'https://inctagram.work/api/v1/',
  fetch: customFetch,
});
