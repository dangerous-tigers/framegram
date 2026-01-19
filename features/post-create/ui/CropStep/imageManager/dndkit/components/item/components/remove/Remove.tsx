import React from 'react';

import { Action, ActionProps } from '../action';
import { CloseOutline } from '@/assets/icons';

export function Remove(props: ActionProps) {
  return (
    <Action {...props}>
      <CloseOutline />
    </Action>
  );
}
