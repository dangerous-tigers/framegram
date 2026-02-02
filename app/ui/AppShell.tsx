'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

import { useMe } from '@/entities/user/model/useMe';
import { Sidebar } from '@/widgets/sidebar';

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
