'use client';

import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import { useLogout } from '../api/logout.api';
import { useMe } from '@/app/provider/me-provider';
import { useState } from 'react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LogoutModal = ({ open, onOpenChange }: Props) => {
  const t = useTranslations('sidebar');
  const { mutate: logout, isPending } = useLogout();
  const me = useMe(); // Получение информации о пользователе для отображения email
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    logout(undefined, {
      onSuccess: () => {
        onOpenChange(false);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size='sm'
    >
      <div style={{ padding: '24px' }}>
        <p style={{ marginBottom: '24px' }}>{t('logOutMessage', { email: me?.email || '' })}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
