import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons';
import { Button, Checkbox, Modal, ModalHeaderWithClose, RadioButtonGroup } from '@/shared/ui';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

import type { PaymentType, SubscriptionType } from '../model';
import { useCancelAutoRenewal, useGetMySubscription, useSubscription } from '../model';

import { SubscriptionsCard } from './SubscriptionsCard';

import s from './SubscriptionsWrapper.module.scss';

export function SubscriptionsWrapper() {
  const t = useTranslations('profile.subscriptions');
  const { show } = useAlertStore();
  const { data: subscription } = useGetMySubscription();
  const createSubscription = useSubscription();
  const cancelAutoRenewal = useCancelAutoRenewal();

  const lastSubscription = subscription?.data.at(-1);
  const isSubscriptionActive = lastSubscription && new Date(lastSubscription.endDateOfSubscription) > new Date();

  const [autoRenewal, setAutoRenewal] = useState(subscription?.hasAutoRenewal || false);
  const [accountType, setAccountType] = useState('personal');
  const [costType, setCostType] = useState('10');
  const [paymentModal, setPaymentModal] = useState<null | 'stripe' | 'paypal'>(null);
  const [iAgree, setIAgree] = useState(false);

  const ACCOUNT_TYPE = [
    { label: t('personal'), value: 'personal' },
    { label: t('business'), value: 'business' },
  ];

  const COST_TYPE = [
    {
      label: `$10 ${t('per')} ${t('days', { count: 1 })}`,
      value: '10',
      typeSubscription: 'DAY' as SubscriptionType,
    },
    {
      label: `$50 ${t('per')} ${t('weekly', { count: 7 })}`,
      value: '50',
      typeSubscription: 'WEEKLY' as SubscriptionType,
    },
    {
      label: `$100 ${t('per')} ${t('monthly')}`,
      value: '100',
      typeSubscription: 'MONTHLY' as SubscriptionType,
    },
  ];

  useEffect(() => {
    if (!isSubscriptionActive) {
      setAccountType('personal');
    }
  }, [isSubscriptionActive]);

  useEffect(() => {
    if (subscription?.hasAutoRenewal !== undefined) {
      setAutoRenewal(subscription.hasAutoRenewal);
    }

    if (subscription?.hasAutoRenewal) {
      setAccountType('business');
    }
  }, [subscription]);

  function formatDate(date: string | undefined) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString();
  }

  function handleSubscribe() {
    if (paymentModal === 'stripe') {
      createSubscription.mutate({
        paymentType: 'STRIPE' as PaymentType,
        typeSubscription: COST_TYPE.find((item) => item.value === costType)?.typeSubscription as SubscriptionType,
        amount: Number(costType),
        baseUrl: `${window.location}/profile/settings`,
      });
    } else {
      show({
        error: t('comingSoon'),
        severity: 'success',
        variant: 'default',
        description: null,
      });
    }
  }

  function handleCancelAutoRenewal() {
    if (autoRenewal) {
      cancelAutoRenewal.mutate();
    }
    setAutoRenewal((prev) => !prev);
  }

  return (
    <div className={s.container}>
      <SubscriptionsCard title={t('currentSubscription')}>
        <div className={s.currentContent}>
          <div className={s.currentHeader}>
            <p>{t('expireAt')}</p>
            <span>{formatDate(lastSubscription?.endDateOfSubscription)}</span>
          </div>
          <div className={s.currentHeader}>
            <p>{t('nextPayment')}</p>
            <span>{autoRenewal ? formatDate(lastSubscription?.endDateOfSubscription) : t('disabled')}</span>
          </div>
        </div>
      </SubscriptionsCard>
      <Checkbox
        label={t('autoRenewal')}
        checked={autoRenewal}
        onCheckedChange={handleCancelAutoRenewal}
      />
      <SubscriptionsCard title={t('accountType')}>
        <RadioButtonGroup
          items={ACCOUNT_TYPE}
          value={accountType}
          onValueChange={setAccountType}
        />
      </SubscriptionsCard>
      <SubscriptionsCard title={t('changeSubscription')}>
        <RadioButtonGroup
          items={COST_TYPE}
          value={costType}
          onValueChange={setCostType}
        />
      </SubscriptionsCard>
      <div className={s.paymentMethods}>
        <Button
          className={s.iconBtn}
          onClick={() => setPaymentModal('stripe')}
        >
          <StripeSvgrepoCom4
            height={64}
            width={96}
          />
        </Button>
        {t('or')}
        <Button
          className={s.iconBtn}
          onClick={() => setPaymentModal('paypal')}
        >
          <PaypalSvgrepoCom4
            height={64}
            width={96}
          />
        </Button>
      </div>
      {paymentModal && (
        <Modal
          open
          onOpenChange={() => setPaymentModal(null)}
          header={
            <ModalHeaderWithClose
              title={t('createPayment')}
              onClose={() => setPaymentModal(null)}
            />
          }
        >
          <div className={s.modalContent}>
            <div className={s.modalText}>{t('autoRenewalModalText')}</div>
            <div className={s.modalFooter}>
              <Checkbox
                label={t('autoRenewal')}
                checked={iAgree}
                onCheckedChange={() => setIAgree(!iAgree)}
              />
              <Button
                disabled={!iAgree || createSubscription.isPending}
                onClick={handleSubscribe}
              >
                {createSubscription.isPending ? '...' : 'OK'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
