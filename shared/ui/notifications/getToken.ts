import { ACCESS_TOKEN } from '@/shared/constants/constants';

export const getToken = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ACCESS_TOKEN) ?? '';
};
