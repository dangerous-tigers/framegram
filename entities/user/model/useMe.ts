import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user.api';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: userApi.me,
    retry: false,
  });
};
