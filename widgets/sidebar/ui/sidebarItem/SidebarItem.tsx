import s from './style.module.scss';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  Component: React.ReactElement;
  href: string;
};
export const SidebarItem = (props: Props) => {
  const { children, Component, href } = props;
  return (
    <Link href={href} className={s.item}>
      {Component} {children}
    </Link>
  );
};
