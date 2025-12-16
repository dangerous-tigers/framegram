import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { client } from '@/shared/api/client';

type ForgotPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await client.POST('/auth/password-recovery', {
        body: data,
      });
      return response.data;
    },

    onError: async (error) => {
      throw error;
    },

    onSuccess: async () => {
      router.push('/login');
    },
  });
};
