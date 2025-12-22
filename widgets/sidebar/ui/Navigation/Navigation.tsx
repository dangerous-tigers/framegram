'use client';
import s from './navigation.module.scss';
import clsx from 'clsx';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import { useTranslations } from 'next-intl';
import { Bookmark, HomeOutline, MessageCircle, Person, PlusSquareOutline, Search, TrendingUp } from '@/assets/icons';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { routes } from '@/shared/config/routes';
import { SidebarItem } from '../SidebarItem/SidebarItem';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const t = useTranslations('sidebar');

  const navigationItems: NavigationItem[] = [
    { href: routes.feed, label: t('feed'), Component: HomeOutline },
    { label: t('create'), Component: PlusSquareOutline }, // TODO: Добавить кнопку создания поста аналогичную LogoutButton и вставить сюда
    { href: routes.profile, label: t('myProfile'), Component: Person },
    { href: routes.messenger, label: t('messenges'), Component: MessageCircle },
    { href: routes.search, label: t('search'), Component: Search },
    { href: routes.statistics, label: t('statistic'), Component: TrendingUp },
    { href: routes.favorites, label: t('favorites'), Component: Bookmark },
    { label: t('logOut'), Component: LogoutButton },
  ];

  return (
    <nav className={clsx(s.navigation, className)}>
      {navigationItems.map((item) => (
        <SidebarItem
          key={item.label}
          item={item}
        />
      ))}
    </nav>
  );
};
