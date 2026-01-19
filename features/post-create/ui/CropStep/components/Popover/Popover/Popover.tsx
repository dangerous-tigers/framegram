'use client';

import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, useState } from 'react';
import { PopoverContext } from '../PopoverProvider';
import { PopoverButton } from '../PopoverButton/PopoverButton';
import { PopoverContent } from '../PopoverContent/PopoverContent';

import s from './Popover.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

const PopoverComponent = ({ className, children, ...rest }: Props) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <PopoverContext.Provider value={{ open, onClose, onOpen }}>
      <div
        {...rest}
        ref={ref}
        className={clsx(s.root, className)}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export const Popover = Object.assign(PopoverComponent, {
  Button: PopoverButton,
  Content: PopoverContent,
});
