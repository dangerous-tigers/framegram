import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, locales } from './config';

import { getUserLocaleAcceptLanguage, getUserLocaleCookie } from '@/services/locale';

const isSupported = (locale: string | undefined) => (locales.find((item) => item === locale) ? locale : undefined);

export default getRequestConfig(async () => {
  const localeFromCookies = await getUserLocaleCookie();
  const localeFromHeaders = await getUserLocaleAcceptLanguage();

  const locale = isSupported(localeFromCookies) || isSupported(localeFromHeaders) || defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
