'use client';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import s from './MainPage.module.scss';

import { getLastPosts } from '@/entities/post/api/getLastPosts';
import { postKeys, publicUserKeys } from '@/entities/post/queries';
import { getTotalUsers } from '@/entities/publicUser/api/getTotalCount';
import { DataPicer } from '@/widgets/dataPicker/DataPicer';
import { PostsGrid } from '@/widgets/postGrid';
import { UserCounter } from '@/widgets/registeredUsers/ui/userCounter';

export const MainPage = () => {
  const { data: posts } = useQuery({
    queryKey: postKeys.last,
    queryFn: getLastPosts,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  const { data: users } = useQuery({
    queryKey: publicUserKeys.all,
    queryFn: getTotalUsers,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  return (
    <div className={clsx(s.mainPage)}>
      <UserCounter count={users?.totalCount} />
      <PostsGrid posts={posts?.items.slice(0, 4)} />
      <DataPicer />
    </div>
  );
};
