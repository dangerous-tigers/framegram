import { client } from '@/shared/api/client';
import { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/types';

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return client.POST('/auth/password-recovery', {
    body: data,
  });
};
