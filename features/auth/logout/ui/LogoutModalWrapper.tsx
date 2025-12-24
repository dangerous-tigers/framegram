'use client';
import { LogoutModal } from '@/features/auth/logout/ui/LogoutModal';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';

export const LogoutModalWrapper = () => {
  const { open } = useLogoutModal();

  return open && <LogoutModal open={open} />;
};
