'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { TruncatedDescription } from '@/entities/post/ui/TruncatedDescription';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';
import { useTimeAgo } from '@/shared/lib/hooks/useTimeAgo';

import { FeedPost } from '../model/feed.api';
import { useFeedFollowState } from '../model/useFeedFollowState';
import { useFeedPostsInfinite } from '../model/useFeedPostsInfinite';
import { useFollowActions } from '../model/useFollowActions';

import { FeedCommentComposer } from './components/FeedCommentComposer';
import { FeedComments } from './components/FeedComments';
import { FeedPostActions } from './components/FeedPostActions';
import { FeedPostCarousel } from './components/FeedPostCarousel';
import { FeedPostHeader } from './components/FeedPostHeader';

import s from './FeedPage.module.scss';

function FeedPostCard({ post }: { post: FeedPost }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const statusByAuthorId = useFeedFollowState((state) => state.statusByAuthorId);
  const isFollowing = statusByAuthorId[post.ownerId] ?? true;
  const { follow, unfollow } = useFollowActions();
  const timeAgo = useTimeAgo(post.createdAt);

  const toggleFollow = () => {
    if (isFollowing) {
      unfollow.mutate(post.ownerId);
    } else {
      follow.mutate(post.ownerId);
    }
    setMenuOpen(false);
  };

  return (
    <article className={s.card}>
      <FeedPostHeader
        post={post}
        isFollowing={isFollowing}
        menuOpen={menuOpen}
        timeAgo={timeAgo}
        onMenuOpenChange={setMenuOpen}
        onToggleFollow={toggleFollow}
      />
      <FeedPostCarousel post={post} />

      <div className={s.content}>
        <FeedPostActions likesCount={post.likesCount} />
        <TruncatedDescription
          text={post.description}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
        <FeedComments postId={post.id} />
        <FeedCommentComposer />
      </div>
    </article>
  );
}

export function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useFeedPostsInfinite();
  const initializeByPosts = useFeedFollowState((state) => state.initializeByPosts);
  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    if (!posts.length) {
      return;
    }

    initializeByPosts(posts.map((post) => post.ownerId));
  }, [initializeByPosts, posts]);

  const ref = useIntersection(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  });

  if (isLoading) {
    return <div className={s.state}>Loading feed...</div>;
  }

  if (isError) {
    return <div className={s.state}>Failed to load feed.</div>;
  }

  if (!posts.length) {
    return <div className={s.state}>Your feed is empty.</div>;
  }

  return (
    <div className={s.feed}>
      {posts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
        />
      ))}
      <div
        ref={ref}
        className={clsx(s.state, s.loader)}
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll for more' : 'End of feed'}
      </div>
    </div>
  );
}
