'use client';
import s from './navigation.module.scss';
import clsx from 'clsx';
import { SidebarItem } from '@/widgets/sidebar/ui/SidebarItem/SidebarItem';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/widgets/sidebar/model/navigation';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  return (
    <div className={clsx(s.navigation, className)}>
      {navigationItems.map((item) => {
        const { href, Component, label, disabled } = item;

        return (
          <SidebarItem
            disabled={disabled}
            href={href}
            Component={<Component />}
            key={label}
            isActive={pathname === href}
          >
            <span>{label}</span>
          </SidebarItem>
        );
      })}
    </div>
  );
};
