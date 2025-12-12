import { client } from '@/shared/api/client';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { LoginFormData } from './Login.schema';
import { parseJwt } from '@/shared/lib/parseJwt';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      client.POST('/auth/login', {
        body: data,
      }),

    onSuccess: async (data) => {
      if (data.data?.accessToken) {
        const token = data?.data?.accessToken;

        if (!token) return;

        localStorage.setItem('accessToken', token);

        const parsedToken = parseJwt(token);
        if (!parsedToken) return;

        router.push(`/profile/${parsedToken.userId}`);
      }

      if (data.error && data.response.status === 400) {
        alert(data.error.messages);
      }
    },
  });
};
