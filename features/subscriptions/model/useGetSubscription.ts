import { useQuery } from '@tanstack/react-query';

import { subscriptionApi } from './subscription.api';

export function useGetMySubscription() {
  const { data, isLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: () => subscriptionApi.getSubscriptions(),
  });

  return {
    data,
    isLoading,
  };
}
