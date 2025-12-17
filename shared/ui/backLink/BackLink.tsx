import s from './backLink.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowBackOutline } from '@/assets/icons';

type PropsBackLink = {
  className?: string;
  href: string;
  label: string;
};

export const BackLink = (props: PropsBackLink) => {
  const { className, href, label } = props;

  return (
    <Link
      href={href}
      className={clsx(s.backLink, className)}
    >
      <ArrowBackOutline />
      {label}
    </Link>
  );
};
