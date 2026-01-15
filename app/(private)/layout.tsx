'use client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { AppShell } from '@/app/ui/AppShell';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();

  if (isPending) return <div>loading...</div>;

  if (!isSuccess) return redirect(routes.auth.login);
  return <AppShell>{children}</AppShell>;
}
