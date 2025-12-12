import { client } from '@/shared/api/client';
import { paths } from '@/shared/api/schema';

export const register = async (data: paths['/auth/registration']['post']['requestBody']) => {
  const response = await client.POST('/auth/registration', {
    body: data,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};
