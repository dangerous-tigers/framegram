'use client';

import { useState } from 'react';
import { LogoutModal } from './LogoutModal';

type Props = {
  children: React.ReactNode;
};

export const LogoutBtn = ({ children }: Props) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <span
        onClick={() => setIsLogoutModalOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </span>
      <LogoutModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
      />
    </>
  );
};
