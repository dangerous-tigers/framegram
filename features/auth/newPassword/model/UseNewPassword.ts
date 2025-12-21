import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { newPassword } from '@/features/auth/newPassword/api/NewPassword.api';
import { NewPasswordRequest } from '@/features/auth/newPassword/model/types';

type Error = {
  statusCode: number;
  error: string;
  messages: { message: string; field?: string }[];
};

export const useNewPassword = () => {
  const router = useRouter();
  const { show } = useAlertStore();

  return useMutation<void, Error, NewPasswordRequest>({
    mutationFn: async (data: NewPasswordRequest) => {
      const response = await newPassword(data);

      if (response.error) {
        throw response.error as Error;
      }

      localStorage.removeItem('accessToken');

      return response.data;
    },

    onError: async (error) => {
      show({
        error: error.messages ? error.messages[0].message : 'Some occurred error',
        severity: 'error',
        variant: 'default',
        description: null,
      });

      setTimeout(() => {
        router.replace('/forgot-password');
      }, 2000);
    },

    onSuccess: async () => {
      router.replace('/login');
    },
  });
};
