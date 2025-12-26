import { postApi } from '@/entities/post/api/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemovePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postApi.deletePost(postId),
    onSuccess: () => {
      // Invalidating and refetching relevant queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['profile-posts'] });
    },
  });
};
