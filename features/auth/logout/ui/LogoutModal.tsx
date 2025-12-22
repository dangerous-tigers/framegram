'use client';
import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ModalHeaderWithClose } from '@/shared/ui/modal/ModalHeaderWithClose';
import s from './LogoutModal.module.scss';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';

type Props = {
  open: boolean;
};

export const LogoutModal = ({ open }: Props) => {
  const t = useTranslations('sidebar');
  const { hide, logout, isPending } = useLogoutModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    logout(undefined, {
      onSuccess: () => {
        hide();
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleClose = () => {
    hide();
  };

  return (
    <Modal
      open={open}
      onOpenChange={hide}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('logOut')}
          onClose={handleClose}
        />
      }
    >
      <div className={s.modalContent}>
        <div className={s.buttonContainer}>
          <Button
            fullWidth
            variant='secondary'
            onClick={handleClose}
            disabled={isPending || isLoading}
          >
            {t('no')}
          </Button>
          <Button
            fullWidth
            variant='primary'
            onClick={handleLogout}
            disabled={isPending || isLoading}
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
