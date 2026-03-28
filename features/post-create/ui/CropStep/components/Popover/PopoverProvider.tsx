'use client';

import { createContext, useContext } from 'react';

type ContextProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const PopoverContext = createContext<ContextProps | null>(null);

export const usePopoverContext = () => {
  const ctx = useContext(PopoverContext);

  if (!ctx) {
    throw new Error('Popover components must be used within <Popover />');
  }

  return ctx;
};
