'use client';
import s from './navigation.module.scss';
import clsx from 'clsx';
import { SidebarItem } from '@/widgets/sidebar/ui/SidebarItem/SidebarItem';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import { useTranslations } from 'next-intl';
import { LogoutBtn } from '@/features/auth/logout/ui/LogoutBtn';

import {
  Bookmark,
  HomeOutline,
  LogOut,
  MessageCircle,
  Search,
  Person,
  PlusSquareOutline,
  TrendingUp,
} from '@/assets/icons';
import { routes } from '@/shared/config/routes';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');

  const navigationItems: NavigationItem[] = [
    { href: routes.feed, label: t('feed'), Component: HomeOutline },
    { href: routes.create, label: t('create'), Component: PlusSquareOutline },
    { href: routes.profile, label: t('myProfile'), Component: Person },
    { href: routes.messenger, label: t('messenges'), Component: MessageCircle },
    { href: routes.search, label: t('search'), Component: Search },
    { href: routes.statistics, label: t('statistic'), Component: TrendingUp },
    { href: routes.favorites, label: t('favorites'), Component: Bookmark },
    { href: routes.empty, label: t('logOut'), Component: LogOut }, // Пустая строка для предотвращения навигации по умолчанию
  ];

  return (
    <div className={clsx(s.navigation, className)}>
      {navigationItems.map((item) => {
        const { href, Component, label, disabled } = item;

        if (label === t('logOut')) {
          return (
            <LogoutBtn key={label}>
              <SidebarItem
                disabled={disabled}
                href={href}
                Component={<Component />}
                isActive={pathname === href}
              >
                <span>{label}</span>
              </SidebarItem>
            </LogoutBtn>
          );
        }

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
