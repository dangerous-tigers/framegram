import { postApi } from '@/entities/post/api/post.api';
import { useGetProfile } from '@/entities/profile/model';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Answer } from './types';

type CommentItem = {
  id: number;
  answerCount?: number;
} & Record<string, unknown>;

type CommentsPage = {
  items: CommentItem[];
} & Record<string, unknown>;

type CommentsInfiniteData = {
  pages: CommentsPage[];
} & Record<string, unknown>;

export function useAddAnswerToComment() {
  const qc = useQueryClient();
  const { show } = useAlertStore();
  const { data: profile } = useGetProfile();

  return useMutation({
    mutationFn: ({ postId, commentId, content }: { postId: number; commentId: number; content: string }) =>
      postApi.addAnswerToComment({ postId, commentId, content }),
    onMutate: async ({ postId, commentId, content }) => {
      await qc.cancelQueries({ queryKey: ['comments', postId] });

      const prevComments = qc.getQueryData<CommentsInfiniteData>(['comments', postId]);

      qc.setQueryData<CommentsInfiniteData | undefined>(['comments', postId], (old) => {
        if (!old?.pages) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              items: page.items.map((item) => {
                if (item.id === commentId) {
                  return {
                    ...item,
                    answerCount: item.answerCount ? item.answerCount + 1 : 1,
                  };
                }
                return item;
              }),
            };
          }),
        };
      });
      const previousAnswers = qc.getQueryData(['answers', postId, commentId]);

      qc.setQueryData(['answers', postId, commentId], (old: Answer[]) => {
        return [
          {
            id: Date.now(),
            commentId,
            likeCount: 0,
            isLiked: false,
            content,
            from: {
              username: profile?.userName,
              avatars: [
                {
                  url: profile?.avatars[0].url,
                },
              ],
            },
            createdAt: new Date().toString(),
          },
          ...old,
        ];
      });

      return { prevComments, previousAnswers };
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['comments', variables.postId] });
      qc.invalidateQueries({ queryKey: ['answers', variables.postId, variables.commentId] });
    },
    onError: (_error, variables, context) => {
      if (context?.prevComments) {
        qc.setQueryData(['comments', variables.postId], context.prevComments);
      }

      show({
        error: 'Add answer error, try again',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
}
