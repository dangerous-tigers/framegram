'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert } from '@/shared/ui/alert/Alert';
import { AlertProvider } from '@/shared/ui/alert/AlertProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MeProvider } from '@/app/provider/me-provider';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

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
