'use client';

import { useTranslations } from 'next-intl';
import { MouseEventHandler, ReactNode } from 'react';

import s from './ConfirmActionModal.module.scss';

import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { Button } from '@/shared/ui/button/Button';
import { Modal, ModalHeaderWithClose } from '@/shared/ui/modal';

type Props = {
  children: ReactNode;
  confirmCallback: () => void;
};
export const ConfirmActionModal = ({ children, confirmCallback }: Props) => {
  const t = useTranslations('confirmActions');
  const { open, hide } = useConfirmStore();

  const handleClose: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    hide();
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
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
            variant='outline'
            onClick={handleClose}
          >
            {t('no')}
          </Button>
          <Button
            fullWidth
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
