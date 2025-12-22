'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import s from './sidebarItem.module.scss';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import React from 'react';

type Props = {
  item: NavigationItem;
};

export const SidebarItem = ({ item }: Props) => {
  const pathname = usePathname();
  const { href, Component, label, disabled } = item;

  if (!href) {
    return <Component className={clsx(s.item, { [s.disabled]: disabled })} />;
  }

  return (
    <Link
      href={href}
      className={clsx(s.item, { [s.disabled]: disabled }, { [s.active]: pathname === href })}
    >
      <Component />
      {label}
    </Link>
  );
};
