import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHeaderWithClose } from '@/shared/ui';

import { ResultModalType } from '../../model/useSubscriptionModal';

import s from './SubsriptionsModal.module.scss';

export function ResultModal({
  resultModal,
  closeResultModal,
}: {
  resultModal: ResultModalType;
  closeResultModal: () => void;
}) {
  const t = useTranslations('profile.settings');
  return (
    <Modal
      open
      onOpenChange={closeResultModal}
      header={
        <ModalHeaderWithClose
          title={resultModal === 'success' ? t('successTitle') : t('errorTitle')}
          onClose={closeResultModal}
        />
      }
    >
      {resultModal === 'success' && (
        <div className={s.modalContent}>
          {t('successMessage')}
          <Button onClick={closeResultModal}>OK</Button>
        </div>
      )}
      {resultModal === 'error' && (
        <div className={s.modalContent}>
          {t('errorMessage')}
          <Button onClick={closeResultModal}>{t('backToPayment')}</Button>
        </div>
      )}
    </Modal>
  );
}
