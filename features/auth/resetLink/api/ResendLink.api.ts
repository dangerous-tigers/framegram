import { ResendLinkRequest } from '@/features/auth/resetLink/model/types';
import { client } from '@/shared/api/client';

export const ResendLinkApiRequest = async (data: ResendLinkRequest) => {
  return client.POST('/auth/password-recovery-resending', {
    body: data,
  });
};
