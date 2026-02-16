import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () =>
  useQuery({
    queryKey: ['general'],
    queryFn: async () => {
      try {
        const response = await client.GET('/users/profile');
        return response.data;
      } catch (error) {
        throw new Error('Ошибка загрузки профиля' + error);
      }
    },
  });
