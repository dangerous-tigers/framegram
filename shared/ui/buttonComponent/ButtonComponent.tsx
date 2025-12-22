import { ComponentProps, ElementType, ReactNode } from 'react';
import clsx from 'clsx';
import s from '@/shared/ui/buttonComponent/ButtonComponent.module.css';
import Link, { LinkProps } from 'next/link';

type ButtonComponentOwnProps<E extends ElementType = ElementType> = {
  children: ReactNode;
  as?: E;
  callback?: (value: string) => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
};

type PolymorphicProps<E extends ElementType> = E extends typeof Link ? LinkProps : ComponentProps<E>;

type ButtonComponentProps<E extends ElementType> = ButtonComponentOwnProps<E> &
  Omit<PolymorphicProps<E>, keyof ButtonComponentOwnProps>;

const __DEFAULT_ELEMENT__ = 'button' as const;

export const ButtonComponent = <E extends ElementType = typeof __DEFAULT_ELEMENT__>({
  callback,
  as,
  children,
  isActive,
  disabled,
  className,
  ...rest
}: ButtonComponentProps<E>) => {
  const Component = as || __DEFAULT_ELEMENT__;

  const classes = clsx(
    s.item,
    {
      [s.active]: isActive,
      [s.disabled]: disabled,
    },
    className,
  );

  return (
    <Component
      className={classes}
      onClick={() => callback}
      {...rest}
    >
      {children}
    </Component>
  );
};
