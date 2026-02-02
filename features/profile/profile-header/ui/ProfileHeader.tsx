'use client';
import Link from 'next/link';

import { Paid } from '@/assets/icons';
import profile_img_placeholder from '@/assets/illustrations/avatar-placeholder.png';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

import s from './ProfileHeader.module.scss';

type Props = {
  hasPaymentSubscription: boolean;
  profile: UserProfileByIdWithPostsResponse;
};

export const ProfileHeader = ({ profile, hasPaymentSubscription }: Props) => {
  const { data } = useMe();

  const isOwner = data?.userId === profile.id;

  return (
    <div className={s.container}>
      <div className={s.profilePicture}>
        <img
          src={profile.avatars?.[0]?.url ?? profile_img_placeholder.src}
          alt={`${profile.userName}'s profile picture`}
        />
      </div>
      <div className={s.userName}>
        <h2>
          {profile.userName}
          {hasPaymentSubscription && <Paid />}
        </h2>
        <div className={s.name}>
          <span>
            {profile?.firstName} {profile?.lastName}
          </span>
        </div>
      </div>
      <div className={s.counters}>
        <ul>
          <li>
            <Link href={'/publications'}>
              {profile.publicationsCount}
              <span>Publications</span>
            </Link>
          </li>
          <li>
            <Link href={'/followers'}>
              {profile.followersCount}
              <span>Followers</span>
            </Link>
          </li>
          <li>
            <Link href={'/following'}>
              {profile.followingCount}
              <span>Following</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={s.buttonsBlock}>
        {isOwner && (
          <PolymorphicButton
            className={s.profileButton}
            variant='secondary'
            as={Link}
            href={'/profile/settings?tab=general'}
          >
            Profile Settings
          </PolymorphicButton>
        )}
        {!isOwner && data?.userId && (
          <>
            {!profile.isFollowing ? (
              <PolymorphicButton>Follow</PolymorphicButton>
            ) : (
              <PolymorphicButton>Unfollow</PolymorphicButton>
            )}
            <PolymorphicButton
              variant={'secondary'}
              as={Link}
              href={routes.messenger}
            >
              SendMessage
            </PolymorphicButton>
          </>
        )}
      </div>

      <div className={s.bio}>
        <p>{profile.aboutMe}</p>
      </div>
    </div>
  );
};
