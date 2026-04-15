import { paymentsApi } from '@/features/profile/settings/payments/model/payments.api';
import { useQuery } from '@tanstack/react-query';

export const useGetPayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: paymentsApi,
  });
};
