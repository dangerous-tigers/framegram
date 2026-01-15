'use client';

import { ComponentPropsWithRef } from 'react';
import { usePopoverContext } from '../PopoverProvider';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import s from './PopoverContent.module.scss';

type Props = {
  position?: 'topLeft' | 'topRight';
} & ComponentPropsWithRef<'div'>;

export const PopoverContent = (p: Props) => {
  const { children, position = 'topLeft', className } = p;
  const { open } = usePopoverContext();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={clsx(s.root, position === 'topRight' ? s.topRight : s.topLeft, className)}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 2 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{
            opacity: { type: 'spring', duration: 0.4 },
            y: { type: 'spring', duration: 0.4 },
          }}
          style={{ overflow: 'visible' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
