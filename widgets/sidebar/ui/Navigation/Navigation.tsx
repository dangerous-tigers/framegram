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
import { PolymorphicButton } from '@/shared/ui/buttonComponent/PolymorphicButton';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';
import Link from 'next/link';
import { LogoutModalWrapper } from '@/features/auth/logout/ui/LogoutModalWrapper';
import { routes } from '@/shared/config/routes';
import { CreatePostModal } from '@/features/post-create/ui/createPostModal/CreatePostModal';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const t = useTranslations('sidebar');
  const { show } = useLogoutModal();

  const navigationItems: NavigationItem[] = [
    { href: routes.feed, label: t('feed'), Component: HomeOutline },
    { label: t('create'), Component: PlusSquareOutline, as: 'button' },
    { href: routes.profile, label: t('myProfile'), Component: Person },
    { href: `/profile/${data?.userId}`, label: t('myProfile'), Component: Person },
    { href: routes.messenger, label: t('messenges'), Component: MessageCircle },
    { href: routes.search, label: t('search'), Component: Search },
    { href: routes.statistics, label: t('statistic'), Component: TrendingUp },
    { href: routes.favorites, label: t('favorites'), Component: Bookmark },
    { href: routes.empty, label: t('logOut'), Component: LogOut },
  ];

  const setOpen = useCreatePostStore((s) => s.setOpen);
  const setStep = useCreatePostStore((s) => s.setStep);

  const createPostHandler = () => {
    setStep('upload');
    setOpen(true);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={clsx(s.navigation, className)}>
      <>
        {' '}
        {navigationItems.map((item) => {
          const { href, Component, label, as = Link } = item;

          return (
            <PolymorphicButton
              as={as}
              key={label}
              href={href}
              isActive={pathname === href}
              variant='text'
              className={s.item}
              onClick={() => {
                if (label === t('create')) {
                  createPostHandler();
                }
                if (label === t('logOut')) {
                  show();
                }
              }}
            >
              <Component /> {isMobile ? '' : label}
            </PolymorphicButton>
          );
        })}
      </>
      <CreatePostModal />
      <LogoutModalWrapper />
    </div>
  );
};
