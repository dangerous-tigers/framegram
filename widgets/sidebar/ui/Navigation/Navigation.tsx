'use client';
import s from './navigation.module.scss';
import clsx from 'clsx';
import { SidebarItem } from '@/widgets/sidebar/ui/SidebarItem/SidebarItem';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LogoutModal } from '@/features/auth/logout/ui/LogoutModal';

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

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { href: '/feed', label: t('feed'), Component: HomeOutline },
    { href: '/create', label: t('create'), Component: PlusSquareOutline },
    { href: '/profile', label: t('myProfile'), Component: Person },
    { href: '/messenger', label: t('messenges'), Component: MessageCircle },
    { href: '/search', label: t('search'), Component: Search },
    { href: '/statistics', label: t('statistic'), Component: TrendingUp },
    { href: '/favorites', label: t('favorites'), Component: Bookmark },
    { href: '#', label: t('logOut'), Component: LogOut }, // Изменение href на '#' для предотвращения навигации по умолчанию
  ];

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращение навигации по умолчанию
    setIsLogoutModalOpen(true);
  };

  return (
    <div className={clsx(s.navigation, className)}>
      {navigationItems.map((item) => {
        const { href, Component, label, disabled } = item;

        // Специальная обработка для элемента выхода из системы
        if (label === t('logOut')) {
          return (
            <SidebarItem
              disabled={disabled}
              href={href}
              Component={<Component />}
              key={label}
              isActive={pathname === href}
              onClick={handleLogoutClick} // Добавить обработчик кликов для выхода из системы
            >
              <span>{label}</span>
            </SidebarItem>
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
      <LogoutModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
      />
    </div>
  );
};
