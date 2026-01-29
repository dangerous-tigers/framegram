'use client';

import clsx from 'clsx';
import { useState } from 'react';

import s from './PostsGrid.module.scss';

import { PostViewModel } from '@/entities/profile';
import { MainPost } from '@/widgets/postGrid/ui/MainPost';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  posts?: PostViewModel[];
};

export const PostsGrid = ({ posts }: Props) => {
  if (!posts?.length) return null;
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const toggleExpanded = (postId: number) => {
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
