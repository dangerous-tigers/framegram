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

  const { isLoading, isError } = useMe();
  const path = usePathname();

  if (isLoading) return null;
  if (!isError) return null;

  if (path === routes.auth.login) {
    return null;
  }

  return (
    <div className={clsx(s.headerAuthButtons, className)}>
      <PolymorphicButton
        as={Link}
        variant='text'
        className={s.link}
        href={routes.auth.login}
      >
        {t('logIn')}
      </PolymorphicButton>
      <PolymorphicButton
        as={Link}
        variant='primary'
        className={s.linkBlue}
        href={routes.auth.registration}
      >
        {t('signUp')}
      </PolymorphicButton>
    </div>
  );
};
