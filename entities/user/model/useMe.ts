import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user.api';
import { User } from '@/entities/user/model/types';

export const useMe = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: userApi.me,
    retry: false,
  });
};
