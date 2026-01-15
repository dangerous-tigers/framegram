'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { useMe } from '@/entities/user/model/useMe';
import clsx from 'clsx';

export function AppShell({ children }: { children: ReactNode }) {
  const { isSuccess } = useMe();

  return (
    <div className='mainBox'>
      <main className='main'>
        <div className={clsx({ ['mainBoxBody']: isSuccess })}>
          {isSuccess && <Sidebar />}
          {children}
        </div>
      </main>
    </div>
  );
}
