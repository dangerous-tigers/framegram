import s from './sidebarItem.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  Component: React.ReactElement;
  href: string;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
};
export const SidebarItem = (props: Props) => {
  const { children, Component, href, className, isActive, disabled } = props;

  const classes = clsx(s.item, className, {
    [s.active]: isActive,
    [s.disabled]: disabled,
  });

  if (disabled) {
    return (
      <span
        aria-disabled
        tabIndex={-1}
        className={classes}
      >
        {Component} {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={classes}
    >
      {Component} {children}
    </Link>
  );
};
