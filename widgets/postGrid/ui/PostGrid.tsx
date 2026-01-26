'use client';

import clsx from 'clsx';
import { useState } from 'react';

import s from './PostsGrid.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MainPost, Post } from '@/widgets/postGrid/ui/MainPost';

type Props = {
  posts?: Post[];
};

export const PostsGrid = ({ posts }: Props) => {
  if (!posts?.length) return null;
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const toggleExpanded = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className={clsx(s.postsGrid)}>
      {posts.map((post) => {
        const expanded = expandedPosts[post.id] || false;
        return (
          <MainPost
            key={post.id}
            post={post}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
          />
        );
      })}
    </div>
  );
};
