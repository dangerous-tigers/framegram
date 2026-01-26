import { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/types';
import { client } from '@/shared/api/client';

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return client.POST('/auth/password-recovery', {
    body: data,
  });
};
