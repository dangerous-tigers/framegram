'use client';

import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '@/shared/api/client';

const queryClient = new QueryClient();

function MeFetcher() {
  useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await client.GET('/auth/me');
      return res.data;
    },
    retry: false,
  });

  return null;
}

export const useMe = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['me']) as
    | { userId: number; userName: string; email: string; isBlocked: boolean }
    | undefined;
};

export function AppTanstackProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeFetcher />
      {children}
    </QueryClientProvider>
  );
}
