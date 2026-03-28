import enGB from 'rsuite/locales/en_GB';
import ruRU from 'rsuite/locales/ru_RU';
import zhCN from 'rsuite/locales/zh_CN';

import type { Locale } from './config';

type RsuiteLocale = typeof enGB;

export const rsuiteLocaleMap: Record<Locale, RsuiteLocale> = {
  en: enGB,
  ru: ruRU,
  zh: zhCN,

  // rsuite нет этих локалей - Можем потом поискать другой data picker
  be: ruRU,
  uk: ruRU,
  hi: enGB,
};
