import {
  CopyOutline,
  Edit2Outline,
  MoreHorizontalOutline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons';
import { ButtonComponent } from '@/shared/ui/buttonComponent/ButtonComponent';
import * as PrimitivePopover from '@radix-ui/react-popover';
import { ComponentPropsWithoutRef } from 'react';
import s from './Popover.module.scss';

type Props = {
  editPost?: () => void;
  removePost?: () => void;
  isOwner: boolean;
  isAuthorized: boolean;
  isFollow?: boolean;
  follow?: () => void;
  unfollow?: () => void;
  copyLink?: () => void;
} & ComponentPropsWithoutRef<typeof PrimitivePopover.Root>;

export const Popover = ({
  open,
  onOpenChange,
  editPost,
  removePost,
  isOwner,
  isAuthorized,
  isFollow,
  follow,
  unfollow,
  copyLink,
}: Props) => {
  return (
    <PrimitivePopover.Root
      onOpenChange={onOpenChange}
      open={open}
    >
      <PrimitivePopover.Trigger asChild>
        <ButtonComponent
          className={s.showMore}
          aria-label='Show More'
        >
          <MoreHorizontalOutline />
        </ButtonComponent>
      </PrimitivePopover.Trigger>
      <PrimitivePopover.Anchor />
      <PrimitivePopover.Portal>
        <PrimitivePopover.Content
          align='end'
          className={s.popoverContent}
          sideOffset={5}
        >
          {isOwner && (
            <>
              <ButtonComponent>
                <Edit2Outline onClick={editPost} /> Edit
              </ButtonComponent>
              <ButtonComponent>
                <TrashOutline onClick={removePost} /> Delete
              </ButtonComponent>
              <ButtonComponent>
                <CopyOutline onClick={copyLink} /> Copy link
              </ButtonComponent>
            </>
          )}
          {!isOwner && isAuthorized && (
            <>
              <ButtonComponent>
                {isFollow ? <PersonRemoveOutline onClick={unfollow} /> : <PersonAddOutline onClick={follow} />}{' '}
                {isFollow ? 'Unfollow' : 'Follow'}
              </ButtonComponent>
              <ButtonComponent>
                <CopyOutline onClick={copyLink} /> Copy link
              </ButtonComponent>
            </>
          )}
          {!isAuthorized && (
            <ButtonComponent>
              <CopyOutline onClick={copyLink} /> Copy link
            </ButtonComponent>
          )}
        </PrimitivePopover.Content>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  );
};
