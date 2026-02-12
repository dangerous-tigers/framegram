import { client } from '@/shared/api/client';

import { SubscriptionPayload } from './types';

export const subscriptionApi = {
  async getSubscriptions() {
    const response = await client.GET('/subscriptions/current-payment-subscriptions');

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
  async createSubscriptions(body: SubscriptionPayload) {
    const response = await client.POST('/subscriptions', {
      body,
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },

  async cancelAutoSubscriptions() {
    const response = await client.POST('/subscriptions/canceled-auto-renewal');
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
};
