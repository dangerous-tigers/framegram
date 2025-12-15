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
  onClick?: (e: React.MouseEvent) => void;
};
export const SidebarItem = (props: Props) => {
  const { children, Component, href, className, isActive, disabled, onClick } = props;

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

  // If onClick is provided, use a span instead of Link to handle the click
  if (onClick) {
    return (
      <span
        className={classes}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
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
