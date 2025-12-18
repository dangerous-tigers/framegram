'use client';
import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useMe } from '@/app/provider/me-provider';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ModalHeaderWithClose } from '@/shared/ui/modal/ModalHeaderWithClose';
import s from './LogoutModal.module.scss';
import { useLogoutModal } from '@/features/auth/logout/api/useLogoutModal';

export const LogoutModal = () => {
  const t = useTranslations('sidebar');
  const { open, hide, logout, isPending } = useLogoutModal();
  const me = useMe(); // Получение информации о пользователе для отображения email
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

  const onKeyPressHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === 'Escape') {
      hide();
    }
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
          onKeyPress={onKeyPressHandler}
        />
      }
    >
      <div className={s.modalContent}>
        <p className={s.logoutMessage}>{t('logOutMessage', { email: me?.email || '' })}</p>
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
