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
  uploadPhoto: async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/profile/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('error');
    }

    return response.json();
  },
  deletePhoto: async () => {
    const response = await client.DELETE('/users/profile/avatar', {});
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
};
