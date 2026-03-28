import { forgotPassword } from '@/features/auth/ForgotPassword/api/ForgotPassword.api';
import { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/types';
import { useMutation } from '@tanstack/react-query';

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
