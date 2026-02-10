import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { subscriptionApi } from './subscription.api';
import { SubscriptionPayload } from './types';

export function useSubscription() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (body: SubscriptionPayload) => {
      const response = await subscriptionApi.createSubscriptions(body);
      return response;
    },
    onSuccess: (response) => {
      if (response?.url) {
        router.push(response?.url);
      }
    },
  });

  return mutation;
}
