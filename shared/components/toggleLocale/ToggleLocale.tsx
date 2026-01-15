'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { defaultLocale, localeOptions } from '@/i18n/config';
import { setUserLocaleCookie } from '@/services/locale';
import { Select } from '@/shared/ui/select/Select';

export function ToggleLocale() {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();

  const setLocale = (locale: string) => {
    const keyLocale = localeOptions.find((s) => s.value === locale)?.label;

    setUserLocaleCookie(keyLocale || defaultLocale);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Select
      options={localeOptions}
      disabled={false}
      variant={'default'}
      width={'210px'}
      value={localeOptions.find((s) => s.label === locale)?.value}
      onValueChange={(event) => setLocale(event)}
    />
  );
}
