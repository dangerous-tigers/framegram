'use client';

import { postApi } from '@/entities/post/api/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useRemovePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (postId: number) => {

      if (!postId) {
        throw new Error('Post ID is required for deletion');
      }
      return postApi.deletePost(postId);
    },
    onSuccess: (data, postId) => {

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['profile-posts'] });
      
      router.push('/feed');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);

    }
  });
};
