import s from './logo.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { routes } from '@/shared/config/routes';

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
      Framehub
    </Link>
  );
};
