'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useSubscribe } from '@/entities/user/api/useSubscribe';
import { useUnsubscribe } from '@/entities/user/api/useUnsubscribe';
import type { SchemaProfileViewAfterSearchModel } from '@/shared/api/schema';
import { routes } from '@/shared/config/routes';

import s from './UserSearchResultCard.module.scss';

interface UserSearchResultCardProps {
  user: SchemaProfileViewAfterSearchModel;
}

export function UserSearchResultCard({ user }: UserSearchResultCardProps) {
  const t = useTranslations('profile');
  const [isFollowing, setIsFollowing] = useState(false);

  const subscribeMutation = useSubscribe();
  const unsubscribeMutation = useUnsubscribe();

  const avatarUrl = user.avatars?.[0]?.url;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unsubscribeMutation.mutateAsync(user.id);
      } else {
        await subscribeMutation.mutateAsync(user.id);
      }
      setIsFollowing(!isFollowing);
    } catch {
      // State remains unchanged on error
    }
  };

  return (
    <div className={s.card}>
      <Link
        href={`${routes.publicProfile}/${user.id}`}
        className={s.link}
      >
        <div className={s.avatar}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={user.userName}
              width={80}
              height={80}
              className={s.image}
            />
          ) : (
            <div className={s.placeholder}>{user.userName.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className={s.info}>
          <p className={s.username}>{user.userName}</p>
          {(user.firstName || user.lastName) && (
            <p className={s.name}>
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>
      </Link>
      <button
        type='button'
        className={`${s.button} ${isFollowing ? s.buttonFollowing : ''}`}
        onClick={handleFollowToggle}
        disabled={subscribeMutation.isPending || unsubscribeMutation.isPending}
      >
        {isFollowing ? t('unfollow') : t('follow')}
      </button>
    </div>
  );
}
