'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AppShell } from '@/app/ui/AppShell';
import { useMe } from '@/entities/user/model/useMe';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { routes } from '@/shared/config/routes';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, data } = useMe();

  if (isPending) return <CatPreloader />;

  if (!data?.userId) return redirect(routes.notAuth);

  return <AppShell>{children}</AppShell>;
}
