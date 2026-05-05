'use client';

import type { RefObject } from 'react';

import avatarPlaceholder from '@/assets/illustrations/avatar-placeholder.png';

import { MessageComposer } from './MessageComposer';
import { DialogItem, MessageItem, OptimisticMessage } from './types';

import s from './MessengerDialogPane.module.scss';

type MessengerDialogPaneProps = {
  partnerId?: number;
  selectedDialog?: DialogItem;
  messages: MessageItem[];
  optimisticMessages: OptimisticMessage[];
  messagesRef: RefObject<HTMLDivElement | null>;
  messageInput: string;
  myUserId?: number;
  isMessagesLoading: boolean;
  onMessageInputChange: (value: string) => void;
  onSend: () => void;
  formatTime: (dateString: string) => string;
};

export const MessengerDialogPane = ({
  partnerId,
  selectedDialog,
  messages,
  optimisticMessages,
  messagesRef,
  messageInput,
  myUserId,
  isMessagesLoading,
  onMessageInputChange,
  onSend,
  formatTime,
}: MessengerDialogPaneProps) => {
  return (
    <div className={s.rightContent}>
      {!partnerId && <p className={s.emptyState}>Choose who you would like to talk to</p>}
      {partnerId && (
        <>
          <div className={s.chatHeader}>
            <div className={s.chatAvatar}>
              <img
                src={selectedDialog?.avatars?.[0]?.url ?? avatarPlaceholder.src}
                alt=''
              />
            </div>
            <p className={s.chatUserName}>{selectedDialog?.userName ?? 'User'}</p>
          </div>
          <div
            ref={messagesRef}
            className={s.messageList}
          >
            {messages.map((message) => {
              const isOutgoing = message.ownerId === myUserId;

              return (
                <div
                  key={message.id}
                  className={isOutgoing ? s.messageRowOutgoing : s.messageRowIncoming}
                >
                  {!isOutgoing && (
                    <div className={s.messageAvatar}>
                      <img
                        src={selectedDialog?.avatars?.[0]?.url ?? avatarPlaceholder.src}
                        alt=''
                      />
                    </div>
                  )}
                  <div className={`${s.messageItem} ${isOutgoing ? s.messageOutgoing : s.messageIncoming}`}>
                    {message.messageText}
                    <span className={s.messageMeta}>{formatTime(message.createdAt)}</span>
                  </div>
                </div>
              );
            })}
            {optimisticMessages.map((message) => (
              <div
                key={message.id}
                className={s.messageRowOutgoing}
              >
                <div className={`${s.messageItem} ${s.messageOutgoing}`}>
                  {message.messageText}
                  <span className={s.messageMeta}>{message.status}</span>
                </div>
              </div>
            ))}
            {isMessagesLoading && <p className={s.listInfo}>Loading messages...</p>}
          </div>
        </>
      )}
      {partnerId && (
        <MessageComposer
          value={messageInput}
          onValueChange={onMessageInputChange}
          onSend={onSend}
        />
      )}
    </div>
  );
};
