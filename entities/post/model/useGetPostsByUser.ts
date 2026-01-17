import { useQuery } from '@tanstack/react-query';

import { postApi } from '@/entities/post/api/post.api';

export const useGetPostsByUser = (userId: number, endCursorPostId: number = 0) => {
  return useQuery({
    queryKey: ['posts', 'user', userId, endCursorPostId],
    queryFn: () => postApi.getPostsByUser(userId, endCursorPostId),
    enabled: userId > 0,
  });
};
