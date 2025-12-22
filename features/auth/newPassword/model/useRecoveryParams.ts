import { useSearchParams } from 'next/navigation';

export const useRecoveryParams = () => {
  const params = useSearchParams();

  const recoveryCode = params.get('code');
  const email = params.get('email');

  return {
    recoveryCode,
    email,
  };
};
