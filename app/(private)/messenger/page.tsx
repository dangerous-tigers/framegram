'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useMe } from '@/entities/user/model/useMe';
import {
  useDialogsInfiniteQuery,
  useMessagesInfiniteQuery,
  useMessengerSocket,
  useUpdateMessagesStatusMutation,
} from '@/features/messenger/api';

import { MessengerDialogPane } from './ui/MessengerDialogPane';
import { MessengerSidebar } from './ui/MessengerSidebar';
import { DialogItem, MessageItem, OptimisticMessage } from './ui/types';

import s from './page.module.scss';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);
  const dialogsRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const markedAsReadRef = useRef<Set<number>>(new Set());
  const isLoadingOlderMessagesRef = useRef(false);
  const { data: me } = useMe();

  const partnerId = useMemo(() => {
    const rawPartnerId = searchParams.get('partnerId');
    const parsed = Number(rawPartnerId);

    if (!rawPartnerId || Number.isNaN(parsed) || parsed <= 0) {
      return undefined;
    }

    return parsed;
  }, [searchParams]);
  const selectedPartnerId = partnerId;

  const dialogsQuery = useDialogsInfiniteQuery(searchName);
  const messagesQuery = useMessagesInfiniteQuery(partnerId);

  const dialogs: DialogItem[] = dialogsQuery.data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const messages = useMemo(() => {
    const mergedMessages: MessageItem[] = messagesQuery.data?.pages.flatMap((page) => page.items ?? []) ?? [];

    return mergedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [messagesQuery.data?.pages]);
  const selectedDialog = dialogs.find((dialog) => {
    const dialogPartnerId = me?.userId === dialog.ownerId ? dialog.receiverId : dialog.ownerId;
    return dialogPartnerId === selectedPartnerId;
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
    const timeoutId = setTimeout(() => {
      setSearchName(searchInput.trim());
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const node = dialogsRef.current;

    if (!node) {
      return;
    }

    const handleScroll = () => {
      const nearBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 24;

      if (nearBottom && hasNextDialogsPage && !isDialogsFetchingNextPage) {
        fetchNextDialogsPage();
      }
    };

    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, [fetchNextDialogsPage, hasNextDialogsPage, isDialogsFetchingNextPage]);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node) {
      return;
    }

    const handleScroll = () => {
      const nearTop = node.scrollTop <= 24;

      if (nearTop && hasNextMessagesPage && !isMessagesFetchingNextPage) {
        const previousHeight = node.scrollHeight;
        isLoadingOlderMessagesRef.current = true;

        fetchNextMessagesPage().then(() => {
          const nextHeight = node.scrollHeight;
          node.scrollTop = nextHeight - previousHeight + node.scrollTop;
          isLoadingOlderMessagesRef.current = false;
        });
      }
    };

    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, [fetchNextMessagesPage, hasNextMessagesPage, isMessagesFetchingNextPage]);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node || isLoadingOlderMessagesRef.current) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [messages, optimisticMessages, partnerId]);

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

  const handleSelectDialog = (dialogPartnerId: number) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('partnerId', String(dialogPartnerId));
    router.replace(`${pathname}?${nextParams.toString()}`);
    setOptimisticMessages([]);
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
          selectedPartnerId={selectedPartnerId}
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
