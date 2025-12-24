'use client';

import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useLogout } from '../api/logout.api';
import { useState } from 'react';
import { ModalHeaderWithClose } from '@/shared/ui/modal/ModalHeaderWithClose';
import s from './LogoutModal.module.scss';
import { useMe } from '@/entities/user/model/useMe';

type Props = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export const LogoutModal = ({ open, onOpenChangeAction }: Props) => {
  const t = useTranslations('sidebar');
  const { mutate: logout, isPending } = useLogout();
  const { data: me } = useMe(); // Получение информации о пользователе для отображения email
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    logout(undefined, {
      onSuccess: () => {
        onOpenChangeAction(false);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleCancel = () => {
    onOpenChangeAction(false);
  };

  const handleOnClose = () => {
    onOpenChangeAction(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChangeAction}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('logOut')}
          onClose={handleOnClose}
        />
      }
    >
      <div className={s.modalContent}>
        <p className={s.logoutMessage}>{t('logOutMessage', { email: me?.email || '' })}</p>
        <div className={s.buttonContainer}>
          <Button
            variant='secondary'
            onClick={handleCancel}
            disabled={isPending || isLoading}
          >
            {t('no')}
          </Button>
          <Button
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
