'use client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { AppShell } from '@/app/ui/AppShell';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();
  const pathname = usePathname();

  if (isPending) return <div>loading...</div>;

  if (!isSuccess) return redirect(routes.auth.login);
  
  // Для страницы feed используем специальный layout с боковыми панелями
  if (pathname === '/feed') {
    return <>{children}</>;
  }
  
  return <AppShell>{children}</AppShell>;
}
