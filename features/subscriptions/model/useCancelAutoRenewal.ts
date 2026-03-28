import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { subscriptionApi } from './subscription.api';
import { SubscriptionResponse } from './types';

export function useCancelAutoRenewal() {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();
  const mutate = useMutation({
    mutationFn: async () => {
      const response = await subscriptionApi.cancelAutoSubscriptions();
      return response;
    },
    onSuccess: () => {
      queryClient.setQueriesData(
        {
          queryKey: ['subscription'],
        },
        (oldData: SubscriptionResponse) => {
          return {
            ...oldData,
            hasAutoRenewal: false,
          };
        },
      );

      show({
        error: 'Auto renewal canceled',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
    onError: () => {
      show({
        error: 'Failed to cancel auto renewal',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
  return mutate;
}
