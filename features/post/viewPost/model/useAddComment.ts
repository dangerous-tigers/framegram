import { postApi } from '@/entities/post/api/post.api';
import { useGetProfile } from '@/entities/profile/model';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostCommentsResponse } from './types';

export function useAddComment() {
  const qc = useQueryClient();
  const { show } = useAlertStore();
  const { data } = useGetProfile();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => postApi.addComent({ id, content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments'] });
    },
    onMutate: ({ id, content }: { id: number; content: string }) => {
      const previousComments = qc.getQueryData(['comments']);
      const profile = data ?? qc.getQueryData(['general']);
      const avatars = profile?.avatars[0]?.url;
      qc.setQueryData(['comments', id], (old: { pages: PostCommentsResponse[] }) => {
        return {
          ...old,
          pages: old.pages.map((page: PostCommentsResponse) => {
            return {
              ...page,
              items: [
                {
                  id: Date.now(),
                  isLiked: false,
                  likeCount: 0,
                  createdAt: new Date().toISOString(),
                  content,
                  postId: id,
                  from: {
                    username: profile?.userName,
                    avatars: avatars ? [{ url: avatars }] : [],
                  },
                },
                ...page.items,
              ],
            };
          }),
        };
      });
      return { previousComments };
    },
    onError: () => {
      qc.setQueryData(['comments'], (old: PostCommentsResponse) => old);
      show({
        error: 'Error adding a comment',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
}
