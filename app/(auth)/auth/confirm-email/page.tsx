'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useConfirmEmail } from '@/features/auth/confirm-email/model/useConfirmEmail';

export default function ConfirmEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { mutate, isSuccess, isPending, isError, error } = useConfirmEmail();

  const code = params.get('code');

  useEffect(() => {
    if (!code) return;
    mutate(code);
  }, [code]);

  if (isPending) return <p>Confirming email...</p>;

  if (isError) {
    return <p>Email confirmation failed: {(error as Error).message}</p>;
  }

  if (isSuccess) {
    return (
      <div>
        <h1>Congratulations!</h1>
        <p>Your email has been confirmed</p>

        <button onClick={() => router.push('/auth/sign-in')}>Sign In</button>
      </div>
    );
  }

  return null;
}
