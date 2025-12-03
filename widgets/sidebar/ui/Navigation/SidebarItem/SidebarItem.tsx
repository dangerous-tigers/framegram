import s from './sidebarItem.module.scss';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  Component: React.ReactElement;
  href: string;
  className?: string;
  isActive?: boolean;
};
export const SidebarItem = (props: Props) => {
  const { children, Component, href, className, isActive } = props;
  return (
    <Link href={href} className={`${s.item} ${className ?? ''}` + (isActive ? s.active : '')}>
      {Component} {children}
    </Link>
  );
};
