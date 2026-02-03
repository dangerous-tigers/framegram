import { useTranslations } from 'next-intl';

import { Button, Checkbox, Modal, ModalHeaderWithClose } from '@/shared/ui';

import s from './SubsriptionsModal.module.scss';

export function PaymentModal({
  closePaymentModal,
  handleSubscribe,
  iAgree,
  isPending,
  toggleIAgree,
}: {
  closePaymentModal: () => void;
  handleSubscribe: () => void;
  iAgree: boolean;
  isPending: boolean;
  toggleIAgree: () => void;
}) {
  const t = useTranslations('profile.subscriptions');
  return (
    <Modal
      open
      onOpenChange={closePaymentModal}
      header={
        <ModalHeaderWithClose
          title={t('createPayment')}
          onClose={closePaymentModal}
        />
      }
    >
      <div className={s.modalContent}>
        <div className={s.modalText}>{t('autoRenewalModalText')}</div>
        <div className={s.modalFooter}>
          <Checkbox
            label={t('autoRenewal')}
            checked={iAgree}
            onCheckedChange={toggleIAgree}
          />
          <Button
            disabled={!iAgree || isPending}
            onClick={handleSubscribe}
          >
            {isPending ? '...' : 'OK'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
