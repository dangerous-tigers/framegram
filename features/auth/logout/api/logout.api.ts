import { useRouter } from 'next/navigation';

import { client } from '@/shared/api/client';
import { routes } from '@/shared/config/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ApiError {
  statusCode: number;
  error: string;
  messages: string;
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      const response = await client.POST('/auth/logout');

      if (response.error) {
        throw response.error;
      }

      localStorage.removeItem('accessToken');

      return response.data;
    },
    onSuccess: () => {
      router.push(routes.auth.login);
      router.refresh();
      queryClient.removeQueries({ queryKey: ['me'] });
    },
  });
};
