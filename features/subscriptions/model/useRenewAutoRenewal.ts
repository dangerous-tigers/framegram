import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { subscriptionApi } from './subscription.api';
import { SubscriptionResponse } from './types';

export function useRenewAutoRenewal() {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();
  const mutate = useMutation({
    mutationFn: async () => {
      const response = await subscriptionApi.renewAutoSubscriptions();
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
            hasAutoRenewal: true,
          };
        },
      );

      show({
        error: 'Auto renewal renewed',
        severity: 'success',
        variant: 'default',
        description: null,
      });
    },
    onError: () => {
      show({
        error: 'Failed to renew auto renewal',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
  return mutate;
}
