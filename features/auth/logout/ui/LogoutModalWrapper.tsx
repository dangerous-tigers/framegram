'use client';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';
import { LogoutModal } from '@/features/auth/logout/ui/LogoutModal';

export const LogoutModalWrapper = () => {
  const { open } = useLogoutModal();

  return open && <LogoutModal open={open} />;
};
