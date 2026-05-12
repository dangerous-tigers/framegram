'use client';

import { type RefObject, useEffect, useState } from 'react';

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
  onDeleteMessage: (id: number) => void;
  onEditMessage: (id: number, message: string) => void;
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
  onDeleteMessage,
  onEditMessage,
  formatTime,
}: MessengerDialogPaneProps) => {
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    if (editingMessageId === null) {
      return;
    }

    const message = messages.find((item) => item.id === editingMessageId);

    if (!message) {
      setEditingMessageId(null);
      setEditingText('');
    }
  }, [editingMessageId, messages]);

  const startEditing = (id: number, text: string) => {
    setEditingMessageId(id);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const saveEditing = () => {
    if (editingMessageId === null) {
      return;
    }

    const text = editingText.trim();

    if (!text) {
      return;
    }

    onEditMessage(editingMessageId, text);
    cancelEditing();
  };

  const isMessageEdited = (createdAt: string, updatedAt: string) => {
    return new Date(updatedAt).getTime() > new Date(createdAt).getTime();
  };

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
                  <div className={`${s.messageBlock} ${isOutgoing ? s.messageBlockOutgoing : s.messageBlockIncoming}`}>
                    <div className={`${s.messageItem} ${isOutgoing ? s.messageOutgoing : s.messageIncoming}`}>
                      {editingMessageId === message.id ? (
                        <textarea
                          className={s.editInput}
                          value={editingText}
                          onChange={(event) => setEditingText(event.target.value)}
                          rows={2}
                        />
                      ) : (
                        message.messageText
                      )}
                      <span className={s.messageMeta}>
                        {isMessageEdited(message.createdAt, message.updatedAt)
                          ? `edited ${formatTime(message.updatedAt)} · `
                          : ''}
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    {isOutgoing && editingMessageId !== message.id && (
                      <div className={s.messageActions}>
                        <button
                          type='button'
                          className={s.actionButton}
                          onClick={() => startEditing(message.id, message.messageText)}
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          className={s.actionButtonDanger}
                          onClick={() => onDeleteMessage(message.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {isOutgoing && editingMessageId === message.id && (
                      <div className={s.messageActions}>
                        <button
                          type='button'
                          className={s.actionButton}
                          onClick={saveEditing}
                        >
                          Save
                        </button>
                        <button
                          type='button'
                          className={s.actionButton}
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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
