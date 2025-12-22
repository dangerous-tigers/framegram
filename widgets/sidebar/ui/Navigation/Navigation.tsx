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
import { LogoutModalWrapper } from '@/features/auth/logout/ui/LogoutModalWrapper';
import { routes } from '@/shared/config/routes';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');
  const { show } = useLogoutModal();

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
      <LogoutModalWrapper />
    </div>
  );
};
