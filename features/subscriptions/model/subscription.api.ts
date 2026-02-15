import { client } from '@/shared/api/client';

import { SubscriptionPayload } from './types';

let renewController: AbortController | null = null;
let cancelController: AbortController | null = null;
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
  async renewAutoSubscriptions() {
    renewController?.abort();

    renewController = new AbortController();

    const response = await client.POST('/subscriptions/renew-auto-renewal', {
      signal: renewController?.signal,
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },

  async cancelAutoSubscriptions() {
    cancelController?.abort();

    cancelController = new AbortController();

    const response = await client.POST('/subscriptions/canceled-auto-renewal', {
      signal: cancelController?.signal,
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
};
