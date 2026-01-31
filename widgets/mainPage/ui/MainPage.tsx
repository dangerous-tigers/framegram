'use client';
import clsx from 'clsx';

import { PostViewModel } from '@/entities/profile';
import { PostsGrid } from '@/widgets/postGrid';
import { UserCounter } from '@/widgets/registeredUsers/ui/userCounter';

import s from './MainPage.module.scss';

type Props = {
  usersTotalCount: number;
  posts: PostViewModel[];
};

export const MainPage = ({ usersTotalCount, posts }: Props) => {
  return (
    <div className={clsx(s.mainPage)}>
      <UserCounter count={usersTotalCount} />
      <PostsGrid posts={posts?.slice(0, 4)} />
    </div>
  );
};
