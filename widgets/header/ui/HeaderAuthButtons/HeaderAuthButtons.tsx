'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';

import s from './headerAuthButtons.module.scss';

type PropsHeaderAuthButtons = {
  className?: string;
};

export const HeaderAuthButtons = (props: PropsHeaderAuthButtons) => {
  const { className } = props;

  const t = useTranslations('header');

  const { isLoading, data: user } = useMe();

  if (isLoading) return null;

  if (user) return null;

  return (
    <div className={clsx(s.headerAuthButtons, className)}>
      <Link
        className={s.link}
        href={routes.auth.login}
      >
        {t('logIn')}
      </Link>
      <Link
        className={s.linkBlue}
        href={routes.auth.registration}
      >
        {t('signUp')}
      </Link>
    </div>
  );
};
