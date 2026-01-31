import Link from 'next/link';
import clsx from 'clsx';

import { Framehublogo } from '@/assets/icons';
import { routes } from '@/shared/config/routes';

import s from './logo.module.scss';

type PropsLogo = {
  className?: string;
};

export const Logo = (props: PropsLogo) => {
  const { className } = props;

  return (
    <Link
      href={routes.feed}
      className={clsx(s.logo, className)}
    >
      <Framehublogo />
    </Link>
  );
};
