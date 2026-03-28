import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

import s from './PolymorphicButton.module.scss';

type Variant = 'primary' | 'secondary' | 'outline' | 'text';
type Size = 'sm' | 'md' | 'lg';

type PolymorphicProps<E extends ElementType> = {
  as?: E;
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  isActive?: boolean;
} & Omit<ComponentPropsWithoutRef<E>, 'children' | 'className' | 'disabled'>;

function PolymorphicButtonComponent<E extends ElementType = 'button'>(props: PolymorphicProps<E>, ref: React.Ref<E>) {
  const { as, variant = 'primary', size = 'md', className, disabled, children, fullWidth, isActive, ...rest } = props;

  const Component = as || 'button';

  const classes = clsx(
    s.btn,
    s[variant],
    s[size],
    {
      [s.fullWidth]: fullWidth,
      [s.disabled]: disabled, // применяем для любых элементов
      [s.active]: isActive,
    },
    className,
  );

  // Для элементов, отличных от button, disabled не поддерживается напрямую
  const componentProps = {
    ref,

    className: classes,
    ...(Component === 'button' ? { disabled } : { 'aria-disabled': disabled }),
    ...rest,
  } as ComponentPropsWithoutRef<E>;

  return <Component {...componentProps}>{children}</Component>;
}

export const PolymorphicButton = forwardRef(PolymorphicButtonComponent) as <E extends ElementType = 'button'>(
  props: PolymorphicProps<E> & { ref?: React.Ref<E> },
) => React.ReactElement | null;
