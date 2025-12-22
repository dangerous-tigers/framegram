import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ code?: string; email?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.code) {
    redirect(`/confirm-email?code=${params.code}`);
  }

  return <></>;
}
