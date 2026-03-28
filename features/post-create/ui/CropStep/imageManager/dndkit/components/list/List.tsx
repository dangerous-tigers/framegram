'use client';

import React from 'react';
import clsx from 'clsx';

import s from './List.module.scss';

export interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const List = ({ children, className, style, ...rest }: Props) => {
  return (
    <ul
      style={
        {
          ...style,
        } as React.CSSProperties
      }
      className={clsx(s.list, className)}
      {...rest}
    >
      {children}
    </ul>
  );
};
