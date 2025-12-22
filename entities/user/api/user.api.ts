import { customFetch } from '@/shared/api/customFetch';

export const userApi = {
  async me() {
    const res = await customFetch('https://inctagram.work/api/v1/auth/me');

    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
};
