'use client';

import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
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

// Экспорт хука useMe для доступа к данным пользователя
export const useMe = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['me']);
};

export function AppTanstackProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeFetcher />
      {children}
    </QueryClientProvider>
  );
}
