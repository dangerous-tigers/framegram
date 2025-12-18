import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/api/client';

type ForgotPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await client.POST('/auth/password-recovery', {
        body: data,
      });

      if (response.error) {
        throw new Error(response.error.messages[0].message);
      }

      return response.data;
    },
  });
};
