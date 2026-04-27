'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useSearchUsersQuery } from '@/entities/user/api/useSearchUsersQuery';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';

import { useRecentSearches } from '../hooks/useRecentSearches';

import { RecentSearches } from './RecentSearches';
import { UserSearchResultCard } from './UserSearchResultCard';

import s from './UserSearch.module.scss';

export function UserSearch() {
  const t = useTranslations('profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { recentSearches, addSearch, removeSearch, isLoaded } = useRecentSearches();

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Сохранить поиск когда пользователь вводит текст и есть результаты
  useEffect(() => {
    if (debouncedSearch.trim()) {
      addSearch(debouncedSearch);
    }
  }, [debouncedSearch, addSearch]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchUsersQuery({
    search: debouncedSearch,
  });

  const handleObserver = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const ref = useIntersection(handleObserver);

  const users = data?.pages.flatMap((page) => page?.items || []) || [];

  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search);
  };

  const handleClearRecentSearch = (search: string) => {
    removeSearch(search);
  };

  // Показывать недавние поиски если поиск не начат
  if (!debouncedSearch && isLoaded) {
    return (
      <div className={s.container}>
        <h1 className={s.title}>{t('search')}</h1>
        <div className={s.searchBox}>
          <input
            type='text'
            className={s.input}
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <RecentSearches
          searches={recentSearches}
          onSearchClick={handleRecentSearchClick}
          onClearSearch={handleClearRecentSearch}
        />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>{t('search')}</h1>
      <div className={s.searchBox}>
        <input
          type='text'
          className={s.input}
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <div className={s.loading}>{t('loading')}</div>}

      {!isLoading && users.length === 0 && debouncedSearch && <div className={s.empty}>{t('noResults')}</div>}

      <div className={s.results}>
        {users.map((user, index) => {
          if (user && users.length === index + 1) {
            return (
              <div
                ref={ref}
                key={user.id}
              >
                <UserSearchResultCard user={user} />
              </div>
            );
          } else if (user) {
            return (
              <UserSearchResultCard
                key={user.id}
                user={user}
              />
            );
          }

          return null;
        })}
      </div>

      {isFetchingNextPage && <div className={s.loading}>{t('loadingMore')}</div>}
    </div>
  );
}
