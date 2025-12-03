import { ElementType } from 'react';
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

export type NavigationItem = {
  href: string;
  label: string;
  Component: ElementType;
};

export const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Feed', Component: HomeOutline },
  { href: '/create', label: 'Create', Component: PlusSquareOutline },
  { href: '/profile', label: 'My Profile', Component: Person },
  { href: '/messenger', label: 'Messenger', Component: MessageCircle },
  { href: '/search', label: 'Search', Component: Search },
  { href: '/statistics', label: 'Statistics', Component: TrendingUp },
  { href: '/favorites', label: 'Favorites', Component: Bookmark },
  { href: '/logout', label: 'Log Out', Component: LogOut },
];
