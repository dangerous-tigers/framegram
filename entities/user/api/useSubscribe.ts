import { client } from '@/shared/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await client.POST('/users/following', {
        body: {
          selectedUserId: userId,
        },
      });

      if (response.error) {
        throw new Error('Subscribe failed');
      }

      return response.data;
    },
    onSuccess: () => {
      // Инвалидируем кеш поиска и всех профилей
      queryClient.invalidateQueries({ queryKey: ['search-users'] });
      // Инвалидируем все профиль queries (по всем userName)
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => {
      // Error will be handled by the component using this hook
    },
  });
}
