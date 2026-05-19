import { ResendLinkApiRequest } from '@/features/auth/resetLink/api/ResendLink.api';
import { useMutation } from '@tanstack/react-query';

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
