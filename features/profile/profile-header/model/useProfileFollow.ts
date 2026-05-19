'use client';

import { useEffect, useState } from 'react';

import { feedApi } from '@/features/feed/model/feed.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseProfileFollowParams = {
  profileId: number;
  initialFollowersCount: number;
  initialIsFollowing: boolean;
};

export const useProfileFollow = ({ profileId, initialFollowersCount, initialIsFollowing }: UseProfileFollowParams) => {
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    setFollowersCount(initialFollowersCount);
  }, [initialFollowersCount, initialIsFollowing, profileId]);

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

  const followMutation = useMutation({
    mutationFn: () => feedApi.followUser(profileId),
    onSuccess: () => {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
      updateMeFollowingCount(1);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => feedApi.unfollowUser(profileId),
    onSuccess: () => {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
      updateMeFollowingCount(-1);
    },
  });

  const onToggleFollow = () => {
    if (followMutation.isPending || unfollowMutation.isPending) {
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return {
    isFollowing,
    followersCount,
    onToggleFollow,
    isPending: followMutation.isPending || unfollowMutation.isPending,
  };
};
