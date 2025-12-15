'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { client } from '@/shared/api/client';

const queryClient = new QueryClient();

function MeFetcher() {
  // этот запрос выполняется каждый раз, когда пользователь открывает сайт
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

export function AppTanstackProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeFetcher />
      {children}
    </QueryClientProvider>
  );
}
