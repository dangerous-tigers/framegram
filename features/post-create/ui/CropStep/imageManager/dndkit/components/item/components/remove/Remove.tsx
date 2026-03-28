import React from 'react';

import { CloseOutline } from '@/assets/icons';

import { Action, ActionProps } from '../action';

export function Remove(props: ActionProps) {
  return (
    <Action {...props}>
      <CloseOutline />
    </Action>
  );
}
