import { client } from '@/shared/api/client';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { LoginFormData } from './Login.schema';
import { parseJwt } from '@/shared/lib/parseJwt';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

interface ApiError {
  statusCode: number;
  error: string;
  messages: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { show } = useAlertStore();
  return useMutation<{ accessToken: string } | undefined, ApiError, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const response = await client.POST('/auth/login', {
        body: data,
      });
      if (response.error) {
        throw response.error;
      }

      return response.data;
    },

    onSuccess: async (data) => {
      if (data?.accessToken) {
        const token = data?.accessToken;

        if (!token) return;

        localStorage.setItem('accessToken', token);

        const parsedToken = parseJwt(token);
        if (!parsedToken) return;

        router.push(`/profile/${parsedToken.userId}`);
      }
    },
    onError: (error) => {
      show({
        error: error.messages ? error.messages : 'Some occurred error',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
};
