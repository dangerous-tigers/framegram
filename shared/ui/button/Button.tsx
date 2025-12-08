'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.scss';

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
  onClick,
  ...props
}: Props) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={className(s.btn, s[`btn--${variant}`], className)}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
