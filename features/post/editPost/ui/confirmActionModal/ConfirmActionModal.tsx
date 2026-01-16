'use client';
import { useTranslations } from 'next-intl';

import s from './ConfirmActionModal.module.scss';

import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { useViewPostStore } from '@/features/post/viewPost/model';
import { Button } from '@/shared/ui';
import { Modal } from '@/shared/ui/modal';
import { ModalHeaderWithClose } from '@/shared/ui/modal/ModalHeaderWithClose';

export const ConfirmActionModal = () => {
  const t = useTranslations('confirmAction');
  const { open, hide } = useConfirmStore();
  const { setIsEdit } = useViewPostStore();

  const handleClose = () => {
    hide();
  };

  const handleConfirm = () => {
    hide();
    setIsEdit(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={hide}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('close')}
          onClose={handleClose}
        />
      }
    >
      <div className={s.modalContent}>
        <span>
          {t('Do you really want to finish editing? If you close the changes you have made will not be saved')}
        </span>
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
