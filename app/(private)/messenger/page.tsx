'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useMe } from '@/entities/user/model/useMe';
import {
  useDialogsInfiniteQuery,
  useMessagesInfiniteQuery,
  useMessengerSocket,
  useUpdateMessagesStatusMutation,
} from '@/features/messenger/api';

import { useMessengerPageEffects } from './model/useMessengerPageEffects';
import { useMessengerPageState } from './model/useMessengerPageState';
import { MessengerDialogPane } from './ui/MessengerDialogPane';
import { MessengerSidebar } from './ui/MessengerSidebar';
import { DialogItem, MessageItem } from './ui/types';

import s from './page.module.scss';

export default function Page() {
  const {
    searchInput,
    setSearchInput,
    searchName,
    setSearchName,
    messageInput,
    setMessageInput,
    optimisticMessages,
    setOptimisticMessages,
    partnerId,
    handleSelectDialog,
  } = useMessengerPageState();

  const dialogsRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const markedAsReadRef = useRef<Set<number>>(new Set());
  const isLoadingOlderMessagesRef = useRef(false);
  const { data: me } = useMe();

  const dialogsQuery = useDialogsInfiniteQuery(searchName);
  const messagesQuery = useMessagesInfiniteQuery(partnerId);

  const dialogs: DialogItem[] = dialogsQuery.data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const messages = useMemo(() => {
    const mergedMessages: MessageItem[] = messagesQuery.data?.pages.flatMap((page) => page.items ?? []) ?? [];

    return mergedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [messagesQuery.data?.pages]);

  const selectedDialog = dialogs.find((dialog) => {
    const dialogPartnerId = me?.userId === dialog.ownerId ? dialog.receiverId : dialog.ownerId;
    return dialogPartnerId === partnerId;
  });

  const hasNextDialogsPage = Boolean(dialogsQuery.hasNextPage);
  const isDialogsFetchingNextPage = dialogsQuery.isFetchingNextPage;
  const fetchNextDialogsPage = dialogsQuery.fetchNextPage;
  const hasNextMessagesPage = Boolean(messagesQuery.hasNextPage);
  const isMessagesFetchingNextPage = messagesQuery.isFetchingNextPage;
  const fetchNextMessagesPage = messagesQuery.fetchNextPage;
  const isMessagesLoading = messagesQuery.isLoading || messagesQuery.isFetchingNextPage;
  const isDialogsLoading = dialogsQuery.isLoading || dialogsQuery.isFetchingNextPage;
  const updateReadStatus = useUpdateMessagesStatusMutation();

  useMessengerPageEffects({
    searchInput,
    setSearchName,
    dialogsRef,
    hasNextDialogsPage,
    isDialogsFetchingNextPage,
    fetchNextDialogsPage,
    messagesRef,
    hasNextMessagesPage,
    isMessagesFetchingNextPage,
    fetchNextMessagesPage,
    isLoadingOlderMessagesRef,
    messages,
    optimisticMessages,
    partnerId,
  });

  const { sendMessage } = useMessengerSocket({
    myUserId: me?.userId,
    onReceiveMessage: (payload) => {
      if (!partnerId || !me?.userId) {
        return;
      }

      if (payload.ownerId !== me.userId || payload.receiverId !== partnerId) {
        return;
      }

      setOptimisticMessages((prev) => {
        const index = prev.findIndex((item) => item.messageText === payload.messageText);

        if (index === -1) {
          return prev;
        }

        return prev.filter((_, idx) => idx !== index);
      });
    },
    onErrorMessage: () => {
      setOptimisticMessages((prev) => {
        const index = prev.findIndex((item) => item.status === 'sending');

        if (index === -1) {
          return prev;
        }

        return prev.map((item, idx) => (idx === index ? { ...item, status: 'failed' } : item));
      });
    },
  });

  useEffect(() => {
    if (!partnerId || !messages.length) {
      return;
    }

    const unreadIncomingIds = messages
      .filter((message) => message.ownerId === partnerId && message.status === 'RECEIVED')
      .map((message) => message.id)
      .filter((id) => !markedAsReadRef.current.has(id));

    if (!unreadIncomingIds.length) {
      return;
    }

    unreadIncomingIds.forEach((id) => markedAsReadRef.current.add(id));
    updateReadStatus.mutate(unreadIncomingIds, {
      onError: () => {
        unreadIncomingIds.forEach((id) => markedAsReadRef.current.delete(id));
      },
    });
  }, [messages, partnerId, updateReadStatus]);

  const handleSend = () => {
    if (!partnerId) {
      return;
    }

    const text = messageInput.trim();

    if (!text) {
      return;
    }

    const optimisticId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    setOptimisticMessages((prev) => [{ id: optimisticId, messageText: text, status: 'sending' }, ...prev]);
    setMessageInput('');
    sendMessage({
      receiverId: partnerId,
      message: text,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <section className={s.page}>
      <h1 className={s.pageTitle}>Messenger</h1>

      <div className={s.container}>
        <MessengerSidebar
          dialogs={dialogs}
          dialogsRef={dialogsRef}
          isDialogsLoading={isDialogsLoading}
          searchInput={searchInput}
          selectedPartnerId={partnerId}
          myUserId={me?.userId}
          onSearchInputChange={setSearchInput}
          onSelectDialog={handleSelectDialog}
          formatTime={formatTime}
        />
        <MessengerDialogPane
          partnerId={partnerId}
          selectedDialog={selectedDialog}
          messages={messages}
          optimisticMessages={optimisticMessages}
          messagesRef={messagesRef}
          messageInput={messageInput}
          myUserId={me?.userId}
          isMessagesLoading={isMessagesLoading}
          onMessageInputChange={setMessageInput}
          onSend={handleSend}
          formatTime={formatTime}
        />
      </div>
    </section>
  );
}
