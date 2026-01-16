import { useQuery } from '@tanstack/react-query';

import { postApi } from '@/entities/post/api/post.api';

export const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postApi.getPostById({ id }),
  });
};
