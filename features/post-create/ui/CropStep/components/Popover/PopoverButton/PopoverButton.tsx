'use client';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { ComponentPropsWithRef, useCallback } from 'react';

import { usePopoverContext } from '../PopoverProvider';

import s from './PopoverButton.module.scss';

type Props = ComponentPropsWithRef<'button'>;

export const PopoverButton = ({ children, className, onClick }: Props) => {
  const { open, onClose, onOpen } = usePopoverContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (open) {
        onClose();
      } else {
        onOpen();
      }
    },
    [onClick, open, onClose, onOpen],
  );

  return (
    <motion.button
      className={clsx(s.root, className)}
      data-state={open && 'open'}
      onClick={handleClick}
      animate={{ scale: open ? 0.95 : 1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};
