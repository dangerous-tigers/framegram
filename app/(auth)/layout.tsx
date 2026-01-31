'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();

  if (isPending) return <div>loading...</div>;

  if (isSuccess) return redirect(routes.feed);
  return <>{children}</>;
}
