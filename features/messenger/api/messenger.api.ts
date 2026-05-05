'use client';

import { client } from '@/shared/api/client';
import { components } from '@/shared/api/schema';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { messengerKeys } from './queryKeys';

type InfinityPaginationViewModel = components['schemas']['InfinityPaginationViewModel'];
type LastMessageViewDto = components['schemas']['LastMessageViewDto'];
type MessageViewModel = components['schemas']['MessageViewModel'];

type DialogsResponse = InfinityPaginationViewModel & {
  items?: LastMessageViewDto[];
};

type MessagesResponse = InfinityPaginationViewModel & {
  items?: MessageViewModel[];
};

const MESSENGER_PAGE_SIZE = 12;

export const useDialogsInfiniteQuery = (searchName: string) => {
  const normalizedSearch = searchName.trim();

  return useInfiniteQuery({
    queryKey: messengerKeys.dialogs(normalizedSearch),
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/messenger', {
        params: {
          query: {
            cursor: pageParam,
            pageSize: MESSENGER_PAGE_SIZE,
            searchName: normalizedSearch || undefined,
          },
        },
      });

      if (response.error) {
        throw response.error;
      }

      return response.data as DialogsResponse;
    },
    getNextPageParam: (lastPage) => lastPage.items?.at(-1)?.id ?? undefined,
  });
};

export const useMessagesInfiniteQuery = (dialoguePartnerId?: number) => {
  return useInfiniteQuery({
    queryKey: messengerKeys.dialog(dialoguePartnerId ?? 0),
    enabled: Boolean(dialoguePartnerId),
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/messenger/{dialoguePartnerId}', {
        params: {
          path: {
            dialoguePartnerId: dialoguePartnerId as number,
          },
          query: {
            cursor: pageParam,
            pageSize: MESSENGER_PAGE_SIZE,
          },
        },
      });

      if (response.error) {
        throw response.error;
      }

      return response.data as MessagesResponse;
    },
    getNextPageParam: (lastPage) => lastPage.items?.at(-1)?.id ?? undefined,
  });
};

export const useUpdateMessagesStatusMutation = () => {
  return useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await client.PUT('/messenger', {
        body: { ids },
      });

      if (response.error) {
        throw response.error;
      }
    },
  });
};

export const useDeleteMessageMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await client.DELETE('/messenger/{id}', {
        params: {
          path: { id },
        },
      });

      if (response.error) {
        throw response.error;
      }
    },
  });
};
