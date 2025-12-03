'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.scss';
import { cn } from '@/shared/lib/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
};

export const Button = ({
  children,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: Props) => {
  return (
    <button disabled={disabled} type={type} className={cn(s.btn, s[`btn--${variant}`], className)} {...props}>
      {children}
    </button>
  );
};
