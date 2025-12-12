import { client } from '@/shared/api/client';

export const register = async (data) => {
  const response = await client.POST('/auth/registration', {
    body: data,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};
