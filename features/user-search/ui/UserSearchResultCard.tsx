'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useSubscribe } from '@/entities/user/api/useSubscribe';
import { useUnsubscribe } from '@/entities/user/api/useUnsubscribe';
import type { SchemaProfileViewAfterSearchModel } from '@/shared/api/schema';
import { routes } from '@/shared/config/routes';

import { UserSearchResultCardModule } from './UserSearchResultCard.module.scss';

interface UserSearchResultCardProps {
  user: SchemaProfileViewAfterSearchModel;
}

export function UserSearchResultCard({ user }: UserSearchResultCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.avatars.length > 0);

  const subscribeMutation = useSubscribe();
  const unsubscribeMutation = useUnsubscribe();

  const avatarUrl = user.avatars?.[0]?.url;

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await unsubscribeMutation.mutateAsync(user.id);
    } else {
      await subscribeMutation.mutateAsync(user.id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={UserSearchResultCardModule.card}>
      <Link
        href={`${routes.publicProfile}/${user.userName}`}
        className={UserSearchResultCardModule.link}
      >
        <div className={UserSearchResultCardModule.avatar}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={user.userName}
              width={80}
              height={80}
              className={UserSearchResultCardModule.image}
            />
          ) : (
            <div className={UserSearchResultCardModule.placeholder}>{user.userName.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className={UserSearchResultCardModule.info}>
          <p className={UserSearchResultCardModule.username}>{user.userName}</p>
          {(user.firstName || user.lastName) && (
            <p className={UserSearchResultCardModule.name}>
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>
      </Link>
      <button
        type='button'
        className={`${UserSearchResultCardModule.button} ${isFollowing ? UserSearchResultCardModule.buttonFollowing : ''}`}
        onClick={handleFollowToggle}
        disabled={subscribeMutation.isPending || unsubscribeMutation.isPending}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
