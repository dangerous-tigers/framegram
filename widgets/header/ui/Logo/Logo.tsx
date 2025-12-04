import s from './logo.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

type PropsLogo = {
  className?: string;
};

export const Logo = (props: PropsLogo) => {
  const { className } = props;

  return (
    <Link
      href='/'
      className={clsx(className, s.logo)}
    >
      Framehub
    </Link>
  );
};
