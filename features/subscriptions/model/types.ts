export type SubscriptionType = 'MONTHLY' | 'WEEKLY' | 'DAY';
export type PaymentType = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';

export type SubscriptionPayload = {
  typeSubscription: SubscriptionType;
  paymentType: PaymentType;
  amount: number;
  baseUrl: string;
};
