'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ArrowBackOutline } from '@/assets/icons';
import { AccountManagement, Devices, General, Payments } from '@/features/profile/settings';
import { Button, Modal, ModalHeaderWithClose } from '@/shared/ui';
import { Tabs } from '@/shared/ui/tabs/ui/Tabs';

import s from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('profile.settings');
  const [openModal, setOpenModal] = useState<null | 'success' | 'error'>(null);
  const router = useRouter();
  const params = useSearchParams();

  const TABS = [
    { value: 'general', label: t('general'), content: <General /> },
    { value: 'devices', label: t('devices'), content: <Devices /> },
    { value: 'account-management', label: t('accountManagement'), content: <AccountManagement /> },
    { value: 'payments', label: t('payments'), content: <Payments /> },
  ];

  useEffect(() => {
    if (params.get('success')) {
      setOpenModal('success');
    }
    if (params.get('error')) {
      setOpenModal('error');
    }
  }, [params]);

  function handleModalClose() {
    setOpenModal(null);
    router.push('/profile/settings');
  }
  return (
    <div className={s.container}>
      <div className={s.title}>
        <ArrowBackOutline onClick={router.back} />
        <h2>{t('title')}</h2>
      </div>
      <Tabs
        tabs={TABS}
        className={s.tabs}
      />

      {openModal && (
        <Modal
          open={!!openModal}
          onOpenChange={handleModalClose}
          header={
            <ModalHeaderWithClose
              title={openModal === 'success' ? t('successTitle') : t('errorTitle')}
              onClose={handleModalClose}
            />
          }
        >
          {openModal === 'success' && (
            <div className={s.modalContent}>
              {t('successMessage')}
              <Button onClick={handleModalClose}>OK</Button>
            </div>
          )}
          {openModal === 'error' && (
            <div className={s.modalContent}>
              {t('errorMessage')}
              <Button onClick={handleModalClose}>{t('backToPayment')}</Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
