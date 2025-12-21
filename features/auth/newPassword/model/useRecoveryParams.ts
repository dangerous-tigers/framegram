import { useRouter, useSearchParams } from 'next/navigation';

export const useRecoveryParams = () => {
  const params = useSearchParams();
  const router = useRouter();

  const recoveryCode = params.get('code');
  const email = params.get('email');

  if (!recoveryCode) {
    router.replace('/forgot-password');
    return null;
  }

  return {
    recoveryCode,
    email,
  };
};
