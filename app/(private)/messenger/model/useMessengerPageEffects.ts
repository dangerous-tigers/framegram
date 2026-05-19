import { RefObject, useEffect, useRef } from 'react';

import { MessageItem, OptimisticMessage } from '../ui/types';

type UseMessengerPageEffectsArgs = {
  searchInput: string;
  setSearchName: (value: string) => void;
  dialogsRef: RefObject<HTMLDivElement | null>;
  hasNextDialogsPage: boolean;
  isDialogsFetchingNextPage: boolean;
  fetchNextDialogsPage: () => Promise<unknown>;
  messagesRef: RefObject<HTMLDivElement | null>;
  hasNextMessagesPage: boolean;
  isMessagesFetchingNextPage: boolean;
  fetchNextMessagesPage: () => Promise<unknown>;
  isLoadingOlderMessagesRef: RefObject<boolean>;
  messages: MessageItem[];
  optimisticMessages: OptimisticMessage[];
  partnerId?: number;
};

export const useMessengerPageEffects = ({
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
}: UseMessengerPageEffectsArgs) => {
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchName(searchInput.trim());
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchInput, setSearchName]);

  useEffect(() => {
    const node = dialogsRef.current;

    if (!node) {
      return;
    }

    const handleScroll = () => {
      const nearBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 24;

      if (nearBottom && hasNextDialogsPage && !isDialogsFetchingNextPage) {
        void fetchNextDialogsPage();
      }
    };

    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, [dialogsRef, fetchNextDialogsPage, hasNextDialogsPage, isDialogsFetchingNextPage]);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node) {
      return;
    }

    const handleScroll = () => {
      const nearTop = node.scrollTop <= 24;
      const nearBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 48;
      isNearBottomRef.current = nearBottom;

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
  }, [fetchNextMessagesPage, hasNextMessagesPage, isLoadingOlderMessagesRef, isMessagesFetchingNextPage, messagesRef]);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node || isLoadingOlderMessagesRef.current || !isNearBottomRef.current) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [messagesRef, messages, optimisticMessages, isLoadingOlderMessagesRef]);

  useEffect(() => {
    const node = messagesRef.current;

    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
    isNearBottomRef.current = true;
  }, [messagesRef, partnerId]);
};
