import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/types';
import { forgotPassword } from '@/features/auth/ForgotPassword/api/ForgotPassword.api';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await forgotPassword(data);

      if (response.error) {
        throw new Error(response.error.messages[0].message);
      }

      return response.data;
    },
  });
};
