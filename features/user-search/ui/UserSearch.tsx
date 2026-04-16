'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useSearchUsersQuery } from '@/entities/user/api/useSearchUsersQuery';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';

import { UserSearchResultCard } from './UserSearchResultCard';

import { UserSearchModule } from './UserSearch.module.scss';

export function UserSearch() {
  const t = useTranslations('profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  return (
    <div className={UserSearchModule.container}>
      <h1 className={UserSearchModule.title}>{t('search')}</h1>
      <div className={UserSearchModule.searchBox}>
        <input
          type='text'
          className={UserSearchModule.input}
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <div className={UserSearchModule.loading}>{t('loading')}</div>}

      {!isLoading && users.length === 0 && debouncedSearch && (
        <div className={UserSearchModule.empty}>{t('noResults')}</div>
      )}

      <div className={UserSearchModule.results}>
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

      {isFetchingNextPage && <div className={UserSearchModule.loading}>{t('loadingMore')}</div>}
    </div>
  );
}
