import { useLogout } from '@/features/auth/logout/api/logout.api';
import { useModalStore } from '@/shared/ui/polymorphic-button/model/button-store';

export const useLogoutModal = () => {
  const { open, show, hide } = useModalStore();
  const { mutate: logout, isPending } = useLogout();

  return { hide, open, show, logout, isPending };
};
