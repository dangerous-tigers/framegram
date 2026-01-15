'use client';
import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { useMe } from '@/entities/user/model/useMe';
import { redirect } from 'next/navigation';
import { routes } from '@/shared/config/routes';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { isPending, isSuccess } = useMe();

  if (isPending) return <div>loading...</div>;

  if (!isSuccess) return redirect(routes.auth.login);
  return (
    <div className='mainBoxBody'>
      <Sidebar />
      {children}
    </div>
  );
}
