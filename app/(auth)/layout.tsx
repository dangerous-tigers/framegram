'use client';
import { ReactNode } from 'react';
import { useMe } from '@/entities/user/model/useMe';
import { redirect } from 'next/navigation';
import { routes } from '@/shared/config/routes';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();

  if (isPending) return <div>loading...</div>;

  if (isSuccess) return redirect(routes.feed);
  return <>{children}</>;
}
