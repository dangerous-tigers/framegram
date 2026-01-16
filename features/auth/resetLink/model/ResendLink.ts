import { useMutation } from '@tanstack/react-query';

import { ResendLinkApiRequest } from '@/features/auth/resetLink/api/ResendLink.api';

export const UseResendLink = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await ResendLinkApiRequest({
        email,
        baseUrl: `${window.location.origin}/new-password`,
      });

      if (response.error) {
        throw new Error('Error request resend link');
      }
    },
  });
};
