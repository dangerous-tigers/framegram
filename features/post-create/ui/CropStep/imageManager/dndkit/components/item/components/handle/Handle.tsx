'use client';

import { Move } from '@/assets/icons';
import { Action, ActionProps } from '../action';

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
