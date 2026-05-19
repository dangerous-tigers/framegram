'use client';
import { ReactNode } from 'react';

import { useMe } from '@/entities/user/model/useMe';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending } = useMe();

  if (isPending) return <CatPreloader />;

  return <>{children}</>;
}
