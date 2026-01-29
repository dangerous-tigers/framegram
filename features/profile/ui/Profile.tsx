'use client';

import { UserPostsInfinite } from '../posts/ui/UserPostsInfinite';
import { ProfileHeader } from '../profile-header/ui/ProfileHeader';

import s from './Profile.module.scss';

import { PostsByUserId, PostViewModel, UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { PostViewModal } from '@/features/post/viewPost';

type Props = {
  profile: UserProfileByIdWithPostsResponse;
  hasPaymentSubscription: boolean;
  userId: string;
  posts: PostsByUserId;
  post?: PostViewModel | null;
};

export const Profile = ({ profile, userId, hasPaymentSubscription, posts, post }: Props) => {
  return (
    <div className={s.container}>
      <ProfileHeader
        profile={profile}
        hasPaymentSubscription={hasPaymentSubscription}
      />
      <UserPostsInfinite
        firstBatchOfPosts={posts}
        userId={userId}
      />
      {post && (
        <PostViewModal
          open
          defaultOpen
          post={post}
        />
      )}
    </div>
  );
};
