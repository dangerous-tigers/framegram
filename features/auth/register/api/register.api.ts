import { client } from '@/shared/api/client';
import { RegisterRequest } from '@/features/auth/register/api/register.types';

export const registerApi = async (data: RegisterRequest) => {
  const response = await client.POST('/auth/registration', {
    body: data,
  });

  if (response.error) {
    throw new Error(response.error.messages?.[0].message || response.error.error);
  }

  return response.data;
};
