'use client';

import { client } from '@/shared/api/client';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { routes } from '@/shared/config/routes';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

export default function GoogleRedirectPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { show } = useAlertStore();

  const router = useRouter();

  useEffect(() => {
    if (!code) {
      show({
        error: 'Authorization code not found',
        severity: 'error',
        variant: 'default',
        description: null,
      });
      router.push(`${routes.auth.login}`);
      return;
    }

    const handleGoogleCallback = async (): Promise<void> => {
      const response = await client.POST('/auth/google/login', {
        body: {
          code,
          redirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
        },
      });

      if (response.data?.accessToken) {
        localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
      }
      //if backend return accessToken -- redirect to
      router.replace(`${routes.feed}`);
    };

    handleGoogleCallback();
  }, [code, router]);

  return <CatPreloader />;
}
