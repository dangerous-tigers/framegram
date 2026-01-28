import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { AuthErrorResponse } from '@/features/auth/types';
import { client } from '@/shared/api/client';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { routes } from '@/shared/config/routes';
import { ACCESS_TOKEN } from '@/shared/constants/constants';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

export const GoogleOAuthRedirect = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { show } = useAlertStore();
  const router = useRouter();

  let timeoutID: ReturnType<typeof setTimeout>;

  const redirectTimeout = (timeout: number) => {
    timeoutID = setTimeout(() => {
      router.replace(`${routes.auth.login}`);
    }, timeout);
  };

  const handleGoogleLogin = useMutation({
    mutationFn: async (code: string) => {
      const response = await client.POST('/auth/google/login', {
        body: {
          code,
          redirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
        },
      });
      if (response.data?.accessToken) {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      }

      if (response.error) {
        throw response.error;
      }
    },
    onError: (error: AuthErrorResponse) => {
      show({
        error: error.messages[0].message,
        severity: 'error',
        variant: 'default',
        description: null,
      });
      redirectTimeout(5000);
    },
    onSuccess: () => {
      router.replace(`${routes.feed}`);
    },
  });

  useEffect(() => {
    if (code) {
      handleGoogleLogin.mutate(code);
    }
    return clearInterval(timeoutID);
  }, []);

  return <CatPreloader />;
};
