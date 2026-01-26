import { ReactNode } from 'react';

import { AppShell } from '@/app/ui/AppShell';

export default function PublicLayout({ children, modal }: { children: ReactNode; modal?: ReactNode }) {
  return (
    <AppShell>
      <>
        {children}
        {modal}
      </>
    </AppShell>
  );
}
