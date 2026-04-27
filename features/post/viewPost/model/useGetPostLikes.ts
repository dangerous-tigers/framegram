import { postApi } from '@/entities/post/api/post.api';
import { useQuery } from '@tanstack/react-query';

export function usePostLikes({ id }: { id: number }) {
  return useQuery({
    queryKey: ['post-likes'],
    queryFn: () => postApi.getPostLikes(id),
    staleTime: 0,
  });
}
