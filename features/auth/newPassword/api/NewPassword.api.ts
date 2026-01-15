import { NewPasswordRequest } from '@/features/auth/newPassword/model/types';
import { client } from '@/shared/api/client';

export const newPassword = async (data: NewPasswordRequest) => {
  return client.POST('/auth/new-password', {
    body: data,
  });
};
