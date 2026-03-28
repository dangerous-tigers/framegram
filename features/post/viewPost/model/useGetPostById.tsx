import { postApi } from '@/entities/post/api/post.api';
import { useQuery } from '@tanstack/react-query';

export const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postApi.getPostById({ id }),
  });
};
