import { UpdateProfileUser } from '@/entities/profile/modal/types/types';
import { client } from '@/shared/api/client';

export const profileApi = {
  getProfile: async () => {
    const response = await client.GET('/users/profile');
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
  updateProfile: async (data: UpdateProfileUser) => {
    const response = await client.PUT('/users/profile', {
      body: {
        ...data,
      },
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
};
