'use client';

import type { RefObject } from 'react';

import avatarPlaceholder from '@/assets/illustrations/avatar-placeholder.png';
import { Input } from '@/shared/ui/input';

import { DialogItem } from './types';

import s from './MessengerSidebar.module.scss';

type MessengerSidebarProps = {
  dialogs: DialogItem[];
  dialogsRef: RefObject<HTMLDivElement | null>;
  isDialogsLoading: boolean;
  searchInput: string;
  selectedPartnerId?: number;
  myUserId?: number;
  onSearchInputChange: (value: string) => void;
  onSelectDialog: (partnerId: number) => void;
  formatTime: (dateString: string) => string;
};

export const MessengerSidebar = ({
  dialogs,
  dialogsRef,
  isDialogsLoading,
  searchInput,
  selectedPartnerId,
  myUserId,
  onSearchInputChange,
  onSelectDialog,
  formatTime,
}: MessengerSidebarProps) => {
  return (
    <div className={s.leftContent}>
      <div className={s.searchInput}>
        <Input
          type='search'
          placeholder='Search'
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.currentTarget.value)}
        />
      </div>
      <div
        ref={dialogsRef}
        className={s.dialogList}
      >
        {dialogs.map((dialog) => {
          const dialogPartnerId = myUserId === dialog.ownerId ? dialog.receiverId : dialog.ownerId;
          const isActive = selectedPartnerId === dialogPartnerId;

          return (
            <button
              key={dialog.id}
              type='button'
              className={`${s.dialogItem} ${isActive ? s.dialogItemActive : ''}`}
              onClick={() => onSelectDialog(dialogPartnerId)}
            >
              <div className={s.dialogContent}>
                <div className={s.dialogAvatar}>
                  <img
                    src={dialog.avatars?.[0]?.url ?? avatarPlaceholder.src}
                    alt=''
                  />
                </div>
                <div className={s.dialogTextBlock}>
                  <div className={s.dialogRow}>
                    <p className={s.dialogName}>{dialog.userName}</p>
                    <span className={s.dialogTime}>{formatTime(dialog.createdAt)}</span>
                  </div>
                  <p className={s.dialogMessage}>{dialog.messageText}</p>
                </div>
              </div>
            </button>
          );
        })}
        {isDialogsLoading && <p className={s.listInfo}>Loading dialogs...</p>}
      </div>
    </div>
  );
};
