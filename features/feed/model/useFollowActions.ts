'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { feedApi } from './feed.api';
import { useFeedFollowState } from './useFeedFollowState';

export function useFollowActions() {
  const queryClient = useQueryClient();
  const setFollowing = useFeedFollowState((state) => state.setFollowing);

  const updateMeFollowingCount = (diff: number) => {
    queryClient.setQueryData(
      ['me'],
      (
        oldData: { userId: number; userName: string; email: string; isBlocked: boolean; following: number } | undefined,
      ) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          following: Math.max(0, (oldData.following ?? 0) + diff),
        };
      },
    );
  };

  const unfollow = useMutation({
    mutationFn: async (authorId: number) => {
      await feedApi.unfollowUser(authorId);
      return authorId;
    },
    onSuccess: (authorId) => {
      setFollowing(authorId, false);
      updateMeFollowingCount(-1);
    },
  });

  const follow = useMutation({
    mutationFn: async (authorId: number) => {
      await feedApi.followUser(authorId);
      return authorId;
    },
    onSuccess: (authorId) => {
      setFollowing(authorId, true);
      updateMeFollowingCount(1);
    },
  });

  return {
    follow,
    unfollow,
  };
}
