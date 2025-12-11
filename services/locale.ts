'use server';

import { cookies, headers } from 'next/headers';

import { Locale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocaleCookie() {
  return (await cookies()).get(COOKIE_NAME)?.value;
}

export async function setUserLocaleCookie(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

export async function getUserLocaleAcceptLanguage() {
  const acceptLanguage = (await headers()).get('accept-language');
  return acceptLanguage?.split(',')[0]?.split('-')[0];
}
