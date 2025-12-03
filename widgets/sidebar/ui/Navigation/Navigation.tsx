'use client';
import s from './navigation.module.scss';
import classnames from 'classnames';
import { SidebarItem } from '@/widgets/sidebar/ui/Navigation/SidebarItem/SidebarItem';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/widgets/sidebar/model/navigation';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  return (
    <div className={classnames(className, s.navigation)}>
      {navigationItems.map((item, idx) => {
        const { href, Component, label } = item;

        return (
          <SidebarItem href={href} Component={<Component />} key={idx} isActive={pathname === href}>
            {label}
          </SidebarItem>
        );
      })}
    </div>
  );
};
