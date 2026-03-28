import { redirect } from 'next/navigation';

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

  const getAllPosts = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/all`, { next: { revalidate: 60 } }).then(
    (res) => res.json(),
  );

  return (
    <MainPage
      posts={getAllPosts.items}
      usersTotalCount={getAllPosts.totalUsers}
    />
  );
}
