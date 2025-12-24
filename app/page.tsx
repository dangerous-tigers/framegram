import { redirect } from 'next/navigation';
import { routes } from '@/shared/config/routes';

type PageProps = {
  searchParams: Promise<{ code?: string; email?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.code) {
    redirect(`${routes.auth.confirmEmail}?code=${params.code}`);
  }

  return <></>;
}
