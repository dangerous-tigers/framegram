'use cliet';

import React, { ComponentPropsWithRef, CSSProperties } from 'react';
import clsx from 'clsx';

import s from './Action.module.scss';

export type Props = {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
} & ComponentPropsWithRef<'button'>;

export const Action = ({ active, className, cursor, style, ...props }: Props) => {
  return (
    <button
      {...props}
      className={clsx(s.action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': active?.fill,
          '--background': active?.background,
        } as CSSProperties
      }
    />
  );
};
