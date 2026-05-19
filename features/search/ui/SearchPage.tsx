'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import avatarPlaceholder from '@/assets/illustrations/avatar-placeholder.png';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';
import { Input } from '@/shared/ui/input';

import { useSearchUsersInfinite } from '../model/useSearchUsersInfinite';

import s from './SearchPage.module.scss';

export const SearchPage = () => {
  const t = useTranslations('searchPage');
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchUsersInfinite(search);

  const users = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const nextRef = useIntersection(() => {
    if (!hasNextPage || isFetchingNextPage || search.length === 0) {
      return;
    }
    fetchNextPage();
  });

  return (
    <section className={s.container}>
      <h1 className={s.title}>{t('title')}</h1>
      <Input
        type='search'
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder={t('placeholder')}
      />

      <ul className={s.list}>
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/profile/${user.id}`}
              className={s.itemLink}
            >
              {user.avatars?.[0]?.url ? (
                <img
                  className={s.avatar}
                  src={user.avatars[0].url}
                  alt={user.userName}
                />
              ) : (
                <img
                  className={s.avatarFallback}
                  src={avatarPlaceholder.src}
                  alt={user.userName}
                />
              )}
              <div>
                <div className={s.username}>{user.userName}</div>
                <div className={s.fullname}>
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {isLoading && search.length > 0 && <div className={s.state}>{t('loading')}</div>}
      {isError && <div className={s.state}>{t('error')}</div>}
      {!isLoading && !isError && search.length > 0 && users.length === 0 && <div className={s.state}></div>}
      <div
        ref={nextRef}
        className={s.loader}
      />
    </section>
  );
};
