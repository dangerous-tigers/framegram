'use client';
import { ReactNode } from 'react';
import { redirect, usePathname } from 'next/navigation';

import { AppShell } from '@/app/ui/AppShell';
import { useMe } from '@/entities/user/model/useMe';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { routes } from '@/shared/config/routes';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();
  const pathname = usePathname();

  if (isPending) return <CatPreloader />;

  if (!isSuccess) return redirect(routes.notAuth);

  // Для страницы feed используем специальный layout с боковыми панелями
  if (pathname === '/feed') {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
