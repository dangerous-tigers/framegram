import { client } from '@/shared/api/client';

export const profileApi = {
  getProfile: async () => {
    const response = await client.GET('/users/profile');
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
};
