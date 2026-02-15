export type SubscriptionType = 'MONTHLY' | 'WEEKLY' | 'DAY';
export type PaymentType = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';
export type AccountType = 'personal' | 'business';
export type SubscriptionPayload = {
  typeSubscription: SubscriptionType;
  paymentType: PaymentType;
  amount: number;
  baseUrl: string;
};

export type Subscription = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
};

export type SubscriptionResponse = {
  data: Subscription[];
  hasAutoRenewal: boolean;
};
