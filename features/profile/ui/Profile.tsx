'use client';

import { UserPostsInfinite } from '../posts/ui/UserPostsInfinite';
import { ProfileHeader } from '../profile-header/ui/ProfileHeader';

import s from './Profile.module.scss';

import { UserProfileByIdWithPostsResponse } from '@/entities/profile';

type Props = {
  profile: UserProfileByIdWithPostsResponse;
  userId: string;
};

export const Profile = ({ profile, userId }: Props) => {
  return (
    <div className={s.container}>
      <ProfileHeader profile={profile} />
      <UserPostsInfinite userId={userId} />
    </div>
  );
};
