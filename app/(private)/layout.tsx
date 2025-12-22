'use client';
import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { useMe } from '@/entities/user/model/useMe';
import { redirect } from 'next/navigation';
import { routes } from '@/shared/config/routes';

export default function PublicLayout({
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
