'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Paid } from '@/assets/icons';
import profile_img_placeholder from '@/assets/illustrations/avatar-placeholder.png';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { useGetProfileByUserName, useSubscribe, useUnsubscribe } from '@/entities/user/api';
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
  const subscribeMutation = useSubscribe();
  const unsubscribeMutation = useUnsubscribe();

  // Fetch latest profile data using React Query for live updates
  const { data: queryProfile } = useGetProfileByUserName(profile.userName);

  // Use query data if available, otherwise use prop data (server-side)
  const currentProfile = queryProfile || profile;
  const isOwner = data?.userId === currentProfile.id;

  const handleFollowToggle = async () => {
    if (currentProfile.isFollowing) {
      await unsubscribeMutation.mutateAsync(currentProfile.id);
    } else {
      await subscribeMutation.mutateAsync(currentProfile.id);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.profilePicture}>
        <img
          src={currentProfile.avatars?.[0]?.url ?? profile_img_placeholder.src}
          alt={`${currentProfile.userName}'s profile picture`}
        />
      </div>
      <div className={s.userName}>
        <h2>
          {currentProfile.userName}
          {hasPaymentSubscription && <Paid />}
        </h2>
        <div className={s.name}>
          <span>
            {currentProfile?.firstName} {currentProfile?.lastName}
          </span>
        </div>
      </div>
      <div className={s.counters}>
        <ul>
          <li>
            <Link href={'/publications'}>
              {t.rich('publications', {
                count: currentProfile.publicationsCount,
                b: (chunks) => <>{chunks}</>,
                s: (chunks) => <span>{chunks}</span>,
              })}
            </Link>
          </li>
          <li>
            <Link href={'/followers'}>
              {t.rich('followers', {
                count: currentProfile.followersCount,
                b: (chunks) => <>{chunks}</>,
                s: (chunks) => <span>{chunks}</span>,
              })}
            </Link>
          </li>
          <li>
            <Link href={'/following'}>
              {t.rich('following', {
                count: currentProfile.followingCount,
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
            {!currentProfile.isFollowing ? (
              <PolymorphicButton
                onClick={handleFollowToggle}
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? t('loading') : t('follow')}
              </PolymorphicButton>
            ) : (
              <PolymorphicButton
                onClick={handleFollowToggle}
                disabled={unsubscribeMutation.isPending}
              >
                {unsubscribeMutation.isPending ? t('loading') : t('unfollow')}
              </PolymorphicButton>
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
        <p>{currentProfile.aboutMe}</p>
      </div>
    </div>
  );
};
