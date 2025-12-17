'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Alert } from '@/shared/ui/alert/Alert';
import { AlertProvider } from '@/shared/ui/alert/AlertProvider';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        {children}
        <Alert />
      </AlertProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
