'use client';

import { Action, ActionProps } from '../action';

import { Move } from '@/assets/icons';

export const Handle = (props: ActionProps) => {
  return (
    <Action
      cursor='grab'
      {...props}
    >
      <Move />
    </Action>
  );
};
