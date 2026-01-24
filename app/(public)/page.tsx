import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { getLastPosts } from '@/entities/post/api/getLastPosts';
import { postKeys, publicUserKeys } from '@/entities/post/queries';
import { getTotalUsers } from '@/entities/publicUser/api/getTotalCount';
import { routes } from '@/shared/config/routes';
import { MainPage } from '@/widgets/mainPage/ui/MainPage';

type PageProps = {
  searchParams: Promise<{ code?: string; email?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.code) {
    redirect(`${routes.auth.confirmEmail}?code=${params.code}`);
  }

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: postKeys.last,
      queryFn: getLastPosts,
    }),
    queryClient.prefetchQuery({
      queryKey: publicUserKeys.all,
      queryFn: getTotalUsers,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage />
    </HydrationBoundary>
  );
}
