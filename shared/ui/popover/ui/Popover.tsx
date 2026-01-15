import * as PrimitivePopover from '@radix-ui/react-popover';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import s from './Popover.module.scss';

import { MoreHorizontalOutline } from '@/assets/icons';
import { Button } from '@/shared/ui/button/Button';

type Props = {
  editPost?: () => void;
  removePost?: () => void;
  isOwner: boolean;
  isAuthorized: boolean;
  isFollow?: boolean;
  follow?: () => void;
  unfollow?: () => void;
  copyLink?: () => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<typeof PrimitivePopover.Root>;

export const Popover = ({ open, onOpenChange, children }: Props) => {
  return (
    <PrimitivePopover.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <PrimitivePopover.Trigger asChild>
        <Button
          variant='text'
          className={s.showMore}
          aria-label='Show More'
        >
          <MoreHorizontalOutline />
        </Button>
      </PrimitivePopover.Trigger>
      <PrimitivePopover.Anchor />
      <PrimitivePopover.Portal>
        <PrimitivePopover.Content
          align='end'
          className={s.popoverContent}
          sideOffset={5}
          asChild
        >
          <ul>{children}</ul>
        </PrimitivePopover.Content>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  );
};
