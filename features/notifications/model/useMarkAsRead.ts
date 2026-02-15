import { useState } from 'react';

import { SelectData } from '@/features/notifications/types';
import { client } from '@/shared/api/client';
import { useMutation } from '@tanstack/react-query';

export const useMarkAsRead = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { mutate, status } = useMutation({
    mutationKey: ['markAsRead'],
    mutationFn: async () => {
      const response = await client.PUT('/notifications/mark-as-read', {
        body: {
          ids: selectedIds,
        },
      });

      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    onMutate: async (_, context) => {
      await context.client.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications: SelectData = context.client.getQueryData(['notifications'])!;

      const optimisticNotifications = {
        ...previousNotifications,
        pages: previousNotifications.pages.map((page) => {
          const idsToRemove = new Set(selectedIds.map((id) => id));

          return page
            ? {
                ...page,
                items: page.items.filter((item) => !idsToRemove.has(item.id)),
                totalCount: page.totalCount - selectedIds.length,
                notReadCount: page.notReadCount - selectedIds.length,
              }
            : page;
        }),
      };
      context.client.setQueryData(['notifications'], optimisticNotifications);
      return { previousNotifications };
    },
    onError: (error, variables, onMutateResult: { previousNotifications?: SelectData }, context) => {
      context.client.setQueryData(['notifications'], onMutateResult.previousNotifications);
      setSelectedIds([]);
    },
    onSuccess: async () => {
      setSelectedIds([]);
    },
  });
  return { mutate, status, selectedIds, setSelectedIds };
};
