import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/api/client';
import { useRouter } from 'next/navigation';

type NewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};

type Error = {
  statusCode: number;
  error: string;
  messages: string;
};

export const useNewPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: NewPasswordRequest) => {
      const response = await client.POST('/auth/new-password', {
        body: data,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },

    onError: async (error: Error) => {
      if (error?.statusCode === 400) {
        router.push('/resend-link');
      }
    },

    onSuccess: async () => {
      alert('Пароль изменен');
      router.push('/login');
    },
  });
};
