'use client';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';
import { Sidebar } from '@/widgets/sidebar';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // try {
  //   await getMeServer(); // проверка токена
  // } catch {
  //   redirect(routes.auth.login); // если токен нет или просрочен
  // }
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
