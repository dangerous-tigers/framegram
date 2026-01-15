import { useMutation } from '@tanstack/react-query';

import { forgotPassword } from '@/features/auth/ForgotPassword/api/ForgotPassword.api';
import { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/types';

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
