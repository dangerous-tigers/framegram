import { useMe } from '@/entities/user/model/useMe';

export function useAuth() {
  const { data: user, isLoading } = useMe();

  return {
    user,
    isAuth: !!user,
    isLoading,
  };
}
