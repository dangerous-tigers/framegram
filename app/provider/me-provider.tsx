'use client';

import { useMe } from '@/entities/user/model/useMe';

function MeFetcher() {
  useMe();
  return null;
}

export function MeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MeFetcher />
      {children}
    </>
  );
}
