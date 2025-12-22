'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMe } from '@/entities/user/model/useMe';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export function AppTanstackProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeProvider>{children}</MeProvider>
    </QueryClientProvider>
  );
}

function MeProvider({ children }: { children: ReactNode }) {
  useMe();

  return children;
}
