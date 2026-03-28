export type PaymentTableType = {
  userId: number;
  subscriptionId: string;

  dateOfPayment: string; // ISO string
  endDateOfSubscription: string; // ISO string

  price: number;

  subscriptionType: 'DAY' | 'WEEKLY' | 'MONTHLY';
  paymentType: 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';
};
