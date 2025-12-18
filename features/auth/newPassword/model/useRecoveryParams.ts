import { useRouter, useSearchParams } from 'next/navigation';

export const useRecoveryParams = () => {
  const params = useSearchParams();
  const router = useRouter();

  const recoveryCode = params.get('code');
  const email = params.get('email');

  if (!recoveryCode) {
    router.push('/resend-link');
    return null;
  }

  return {
    recoveryCode,
    email,
  };
};
