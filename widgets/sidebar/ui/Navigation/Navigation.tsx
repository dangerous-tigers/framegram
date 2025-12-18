'use client';
import s from './navigation.module.scss';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import { useTranslations } from 'next-intl';

import {
  Bookmark,
  HomeOutline,
  LogOut,
  MessageCircle,
  Person,
  PlusSquareOutline,
  Search,
  TrendingUp,
} from '@/assets/icons';
import { ButtonComponent } from '@/shared/ui/buttonComponent/ButtonComponent';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';
import Link from 'next/link';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');
  const { show } = useLogoutModal();

  const navigationItems: NavigationItem[] = [
    { href: '/feed', label: t('feed'), Component: HomeOutline },
    { href: '/create', label: t('create'), Component: PlusSquareOutline },
    { href: '/profile', label: t('myProfile'), Component: Person },
    { href: '/messenger', label: t('messenges'), Component: MessageCircle },
    { href: '/search', label: t('search'), Component: Search },
    { href: '/statistics', label: t('statistic'), Component: TrendingUp },
    { href: '/favorites', label: t('favorites'), Component: Bookmark },
    { href: '/logout', label: t('logOut'), Component: LogOut }, // Пустая строка для предотвращения навигации по умолчанию
  ];

  return (
    <div className={clsx(s.navigation, className)}>
      {navigationItems.map((item) => {
        const { href, Component, label, disabled } = item;

        if (href === '/logout')
          return (
            <ButtonComponent
              key={label}
              onClick={show}
            >
              <Component /> {label}
            </ButtonComponent>
          );

        return (
          <ButtonComponent
            as={Link}
            key={label}
            href={href}
            disabled={disabled}
            isActive={pathname === href}
          >
            <Component /> {label}
          </ButtonComponent>
        );
      })}
    </div>
  );
};
