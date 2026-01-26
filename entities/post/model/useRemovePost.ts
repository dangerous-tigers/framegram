'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

export const useRemovePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: (postId: number) => {
      if (!postId) {
        throw new Error('Post ID is required for deletion');
      }
      return postApi.deletePost(postId);
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['profile-posts'] });

      router.back();
    },
    onError: (error: Error) => {
      show({
        error: error.message || 'An error occurred while deleting the post',
        description: 'Please try again later',
        severity: 'error',
        variant: 'default',
      });
    },
  });
};
