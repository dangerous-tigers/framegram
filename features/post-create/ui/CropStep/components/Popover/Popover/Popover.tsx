'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import clsx from 'clsx';

import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

import { PopoverButton } from '../PopoverButton/PopoverButton';
import { PopoverContent } from '../PopoverContent/PopoverContent';
import { PopoverContext } from '../PopoverProvider';

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
