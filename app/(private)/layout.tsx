import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='mainBoxBody'>
      <Sidebar />

      {children}
    </div>
  );
}
