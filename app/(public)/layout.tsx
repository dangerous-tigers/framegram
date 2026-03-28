import { ReactNode } from 'react';

import { AppShell } from '@/app/ui/AppShell';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <>{children}</>
    </AppShell>
  );
}
