import { client } from '@/shared/api/client';

export const confirmEmail = async (code: string) => {
  const res = await client.POST('/auth/registration-confirmation', {
    body: { confirmationCode: code },
  });

  if (res.error) {
    throw new Error(res.error.error);
  }

  return res.data;
};
