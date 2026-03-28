'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { Button } from '@/shared/ui/button/Button';
import { Modal, ModalHeaderWithClose } from '@/shared/ui/modal';

import s from './ConfirmActionModal.module.scss';

type Props = {
  children: ReactNode;
  isPending?: boolean;
  confirmCallback: () => void;
};
export const ConfirmActionModal = ({ children, isPending, confirmCallback }: Props) => {
  const t = useTranslations('confirmActions');
  const { open, hide } = useConfirmStore();

  const handleClose = () => {
    hide();
  };

  const handleConfirm = () => {
    confirmCallback();
    hide();
  };

  return (
    <Modal
      open={open}
      onOpenChange={hide}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('close')}
          onClose={() => handleClose}
        />
      }
    >
      <div className={s.modalContent}>
        {children}
        <div className={s.buttonContainer}>
          <Button
            fullWidth
            disabled={isPending}
            variant='outline'
            onClick={handleClose}
          >
            {t('no')}
          </Button>
          <Button
            fullWidth
            disabled={isPending}
            variant='primary'
            onClick={handleConfirm}
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
