'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('profile');

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
              <span>{t('publications')}</span>
            </Link>
          </li>
          <li>
            <Link href={'/followers'}>
              {profile.followersCount}
              <span>{t('followers')}</span>
            </Link>
          </li>
          <li>
            <Link href={'/following'}>
              {profile.followingCount}
              <span>{t('following')}</span>
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
            {t('profileSettings')}
          </PolymorphicButton>
        )}
        {!isOwner && data?.userId && (
          <>
            {!profile.isFollowing ? (
              <PolymorphicButton>{t('follow')}</PolymorphicButton>
            ) : (
              <PolymorphicButton>{t('unfollow')}</PolymorphicButton>
            )}
            <PolymorphicButton
              variant={'secondary'}
              as={Link}
              href={routes.messenger}
            >
              {t('sendMessage')}
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
