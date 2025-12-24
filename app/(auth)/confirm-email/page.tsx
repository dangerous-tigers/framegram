import { ConfirmEmail } from '@/features/auth/confirm-email/ui/ConfirmEmail';
import { notFound } from 'next/navigation';

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  const code = typeof resolvedSearchParams.code === 'string' ? resolvedSearchParams.code : undefined;

  if (!code) {
    notFound();
  }

  return <ConfirmEmail code={code} />;
}
