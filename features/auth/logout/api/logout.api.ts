import { client } from '@/shared/api/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ApiError {
  statusCode: number;
  error: string;
  messages: string;
}

export const useLogout = () => {
  const router = useRouter();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      const response = await client.POST('/auth/logout');

      if (response.error) {
        throw response.error;
      }

      // Очистка токена доступа из localStorage
      localStorage.removeItem('accessToken');

      return response.data;
    },
    onSuccess: () => {
      // Перенаправление на страницу входа после успешного выхода
      router.push('/login');
      router.refresh(); // Обновление для обновления состояния UI
    },
  });
};
