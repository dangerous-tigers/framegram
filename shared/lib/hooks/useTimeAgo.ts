import { useFormatter } from 'next-intl';

export function useTimeAgo(dateString: string) {
  const formatter = useFormatter();

  const now = new Date();
  const targetDate = new Date(dateString);

  return formatter.relativeTime(targetDate, now);
}
