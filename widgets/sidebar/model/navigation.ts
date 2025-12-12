import { ElementType } from 'react';

export type NavigationItem = {
  href: string;
  label: string;
  Component: ElementType;
  disabled?: boolean;
};
