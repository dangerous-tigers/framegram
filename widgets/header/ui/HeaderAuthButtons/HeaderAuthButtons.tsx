'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

import s from './headerAuthButtons.module.scss';

type PropsHeaderAuthButtons = {
  className?: string;
};

export const HeaderAuthButtons = (props: PropsHeaderAuthButtons) => {
  const { className } = props;

  const t = useTranslations('header');

  const { isLoading, data } = useMe();
  const path = usePathname();

  if (isLoading) return null;

  // Если пользователь залогинен, не показываем кнопки
  if (data) {
    return null;
  }

  if (path === routes.auth.login || path === routes.auth.registration) {
    return null;
  }

  return (
    <div className={clsx(s.headerAuthButtons, className)}>
      <PolymorphicButton
        as={Link}
        className={s.link}
        href={routes.auth.login}
      >
        {t('logIn')}
      </PolymorphicButton>
      <PolymorphicButton
        as={Link}
        className={s.linkBlue}
        href={routes.auth.registration}
      >
        {t('signUp')}
      </PolymorphicButton>
    </div>
  );
};
