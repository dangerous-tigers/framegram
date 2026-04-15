import { PaymentTableType } from '@/features/profile/settings/payments/model/PaymentTableType';
import { client } from '@/shared/api/client';

export const paymentsApi = async (): Promise<PaymentTableType[]> => {
  const response = await client.GET('/subscriptions/my-payments');
  if (response.error) {
    throw response.error;
  }
  return response.data ?? [];
};
