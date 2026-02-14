import { useState } from 'react';

import { SelectData } from '@/features/notifications/types';
import { client } from '@/shared/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { mutate, status } = useMutation({
    mutationKey: ['markAsRead'],
    mutationFn: async () => {
      await client.PUT('/notifications/mark-as-read', {
        body: {
          ids: selectedIds,
        },
      });
      const previousNotifications: SelectData = queryClient.getQueryData(['notifications'])!;

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
      queryClient.setQueryData(['notifications'], optimisticNotifications);

      return { optimisticNotifications };
    },
    onSuccess: async (data) => {
      setSelectedIds([]);
      queryClient.setQueryData(['notifications'], data.optimisticNotifications);
    },
  });
  return { mutate, status, selectedIds, setSelectedIds };
};
