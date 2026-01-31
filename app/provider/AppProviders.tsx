'use client';
import { ReactNode } from 'react';

import { MeProvider } from '@/app/provider/me-provider';
import { Alert } from '@/shared/ui/alert/Alert';
import { AlertProvider } from '@/shared/ui/alert/AlertProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  },
});

export const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MeProvider>
        <AlertProvider>
          {children}
          <Alert />
        </AlertProvider>
      </MeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
