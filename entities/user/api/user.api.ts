import { User } from '@/entities/user/model/types';
import { customFetch } from '@/shared/api/customFetch';

export const userApi = {
  async me(): Promise<User> {
    const res = await customFetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/me`);

    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
};
