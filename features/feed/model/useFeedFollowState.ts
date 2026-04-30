'use client';

import { create } from 'zustand';

type FeedFollowState = {
  statusByAuthorId: Record<number, boolean>;
  initialized: boolean;
  initializeByPosts: (ownerIds: number[]) => void;
  setFollowing: (authorId: number, isFollowing: boolean) => void;
};

export const useFeedFollowState = create<FeedFollowState>((set, get) => ({
  statusByAuthorId: {},
  initialized: false,
  initializeByPosts: (ownerIds) => {
    if (get().initialized) {
      return;
    }

    const initialStatus: Record<number, boolean> = {};

    ownerIds.forEach((id) => {
      initialStatus[id] = true;
    });

    set({
      statusByAuthorId: initialStatus,
      initialized: true,
    });
  },
  setFollowing: (authorId, isFollowing) => {
    set((state) => ({
      statusByAuthorId: {
        ...state.statusByAuthorId,
        [authorId]: isFollowing,
      },
    }));
  },
}));
