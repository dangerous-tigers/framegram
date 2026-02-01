import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { subscriptionApi } from './subscription.api';

export function useCancelAutoRenewal() {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();
  const mutate = useMutation({
    mutationFn: async () => {
      const response = await subscriptionApi.cancelAutoSubscriptions();
      return response;
    },
    onSuccess: () => {
      show({
        error: 'Auto renewal canceled',
        severity: 'success',
        variant: 'default',
        description: null,
      });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
  return mutate;
}
