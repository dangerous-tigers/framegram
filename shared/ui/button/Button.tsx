'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import s from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  fullWidth?: boolean;
};

export const Button = ({
  children,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className,
  onClick,
  fullWidth = false,
  ...props
}: Props) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={clsx(s.btn, s[`btn--${variant}`], fullWidth && s['btn--full_width'], className)}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
