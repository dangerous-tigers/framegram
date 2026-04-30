'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Paid } from '@/assets/icons';
import profile_img_placeholder from '@/assets/illustrations/avatar-placeholder.png';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

import { useProfileFollow } from '../model/useProfileFollow';

import s from './ProfileHeader.module.scss';

type Props = {
  hasPaymentSubscription: boolean;
  profile: UserProfileByIdWithPostsResponse;
};

export const ProfileHeader = ({ profile, hasPaymentSubscription }: Props) => {
  const t = useTranslations('profile');

  const { data } = useMe();

  const isOwner = data?.userId === profile.id;
  const { isFollowing, followersCount, onToggleFollow } = useProfileFollow({
    profileId: profile.id,
    initialFollowersCount: profile.followersCount,
    initialIsFollowing: profile.isFollowing,
  });

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
              {t.rich('publications', {
                count: profile.publicationsCount,
                b: (chunks) => <>{chunks}</>,
                s: (chunks) => <span>{chunks}</span>,
              })}
            </Link>
          </li>
          <li>
            <Link href={'/followers'}>
              {t.rich('followers', {
                count: followersCount,
                b: (chunks) => <>{chunks}</>,
                s: (chunks) => <span>{chunks}</span>,
              })}
            </Link>
          </li>
          <li>
            <Link href={'/following'}>
              {t.rich('following', {
                count: profile.followingCount,
                b: (chunks) => <>{chunks}</>,
                s: (chunks) => <span>{chunks}</span>,
              })}
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
            {!isFollowing ? (
              <PolymorphicButton onClick={onToggleFollow}>{t('follow')}</PolymorphicButton>
            ) : (
              <PolymorphicButton onClick={onToggleFollow}>{t('unfollow')}</PolymorphicButton>
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
