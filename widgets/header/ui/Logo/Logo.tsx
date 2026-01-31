'use client';
import Link from 'next/link';
import clsx from 'clsx';

import { Framehublogo } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';

import s from './logo.module.scss';

type PropsLogo = {
  className?: string;
};

export const Logo = (props: PropsLogo) => {
  const { className } = props;

  const { data } = useMe();

  return (
    <Link
      href={!data ? routes.main : routes.feed}
      className={clsx(s.logo, className)}
    >
      <Framehublogo />
    </Link>
  );
};
