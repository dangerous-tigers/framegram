'use client';

import { useTranslations } from 'next-intl';

import s from './RecentSearches.module.scss';

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  onClearSearch: (search: string) => void;
}

export function RecentSearches({ searches, onSearchClick, onClearSearch }: RecentSearchesProps) {
  const t = useTranslations('profile');

  if (searches.length === 0) {
    return (
      <div className={s.empty}>
        <h2 className={s.emptyTitle}>{t('noRecentSearchesTitle')}</h2>
        <p className={s.emptySubtitle}>{t('noRecentSearchesSubtitle')}</p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>{t('recentSearches')}</h2>
      <div className={s.list}>
        {searches.map((search) => (
          <div
            key={search}
            className={s.item}
          >
            <button
              onClick={() => onSearchClick(search)}
              className={s.searchButton}
            >
              {search}
            </button>
            <button
              onClick={() => onClearSearch(search)}
              className={s.clearButton}
              aria-label={`Clear "${search}" from recent searches`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
