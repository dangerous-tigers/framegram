import { Locale } from '@/i18n/config';

export function mapTimeAgoLocale(locale: Locale): string {
  switch (locale) {
    case 'ru':
      return 'ru';
    case 'uk':
      return 'uk';
    case 'zh':
      return 'zh';
    case 'hi':
      return 'hi';
    case 'be':
      return 'ru'; // Нету Беларуской мовы в javascript-time-ago =( будет русский
    case 'en':
    default:
      return 'en';
  }
}
