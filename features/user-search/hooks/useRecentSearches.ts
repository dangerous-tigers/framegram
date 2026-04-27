import { useCallback, useEffect, useState } from 'react';

const RECENT_SEARCHES_KEY = 'framegram_recent_searches';
const MAX_RECENT_SEARCHES = 10;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузить недавние поиски из localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        const searches = JSON.parse(stored);
        if (Array.isArray(searches)) {
          setRecentSearches(searches);
        }
      } catch {
        // Если ошибка парсинга, игнорируем
      }
    }
    setIsLoaded(true);
  }, []);

  // Добавить новый поиск
  const addSearch = useCallback((search: string) => {
    if (!search.trim()) return;

    setRecentSearches((prev) => {
      // Удалить дубликат если он есть
      const filtered = prev.filter((s) => s !== search);
      // Добавить новый в начало
      const updated = [search, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      // Сохранить в localStorage
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Удалить поиск
  const removeSearch = useCallback((search: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== search);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Очистить все поиски
  const clearAll = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  }, []);

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearAll,
    isLoaded,
  };
}
