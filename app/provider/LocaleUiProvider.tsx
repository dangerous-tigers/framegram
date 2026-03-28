'use client';
import { useLocale } from 'next-intl';
import { CustomProvider } from 'rsuite';

import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { rsuiteLocaleMap } from '@/i18n/rsuiteLocaleMap';

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export const LocaleUiProvider = ({ children }: { children: React.ReactNode }) => {
  const rawLocale = useLocale();

  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return <CustomProvider locale={rsuiteLocaleMap[locale]}>{children}</CustomProvider>;
};
