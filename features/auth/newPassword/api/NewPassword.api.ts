import { client } from '@/shared/api/client';
import { NewPasswordRequest } from '@/features/auth/newPassword/model/types';

export const newPassword = async (data: NewPasswordRequest) => {
  return client.POST('/auth/new-password', {
    body: data,
  });
};
