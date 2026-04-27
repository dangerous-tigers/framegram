'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { SchemaProfileViewAfterSearchModel } from '@/shared/api/schema';
import { routes } from '@/shared/config/routes';

import s from './UserSearchResultCard.module.scss';

interface UserSearchResultCardProps {
  user: SchemaProfileViewAfterSearchModel;
}

export function UserSearchResultCard({ user }: UserSearchResultCardProps) {
  const avatarUrl = user.avatars?.[0]?.url;

  return (
    <div className={s.card}>
      <Link
        href={`${routes.profile}/${user.id}`}
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
          <p className={s.fullName}>
            {user.firstName} {user.lastName}
          </p>
          <p className={s.userTag}>@{user.userName}</p>
        </div>
      </Link>
    </div>
  );
}
