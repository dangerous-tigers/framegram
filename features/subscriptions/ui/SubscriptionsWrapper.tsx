import { useTranslations } from 'next-intl';

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons';
import { formatDate } from '@/shared/lib/formatDate';
import { Button, Checkbox, RadioButtonGroup } from '@/shared/ui';

import { useSubscriptionModals, useSubscriptionState } from '../model';

import { PaymentModal, ResultModal } from './modal';
import { SubscriptionsCard } from './SubscriptionsCard';

import s from './SubscriptionsWrapper.module.scss';

export function SubscriptionsWrapper() {
  const t = useTranslations('profile.settings.accountManagement');

  const {
    costType,
    ACCOUNT_TYPE,
    COST_TYPE,
    autoRenewal,
    accountType,
    setAccountType,
    setCostType,
    lastSubscription,
    isSubscriptionActive,
    handleCancelAutoRenewal,
  } = useSubscriptionState();

  const {
    paymentModal,
    resultModal,
    iAgree,
    isPending,
    openPaymentModal,
    closePaymentModal,
    handleSubscribe,
    closeResultModal,
    toggleIAgree,
  } = useSubscriptionModals({ costType, COST_TYPE });

  return (
    <div className={s.container}>
      {isSubscriptionActive && (
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
      )}
      <Checkbox
        label={t('autoRenewal')}
        checked={autoRenewal}
        onCheckedChange={handleCancelAutoRenewal}
        disabled={!autoRenewal}
      />
      <SubscriptionsCard title={t('accountType')}>
        <RadioButtonGroup
          items={ACCOUNT_TYPE}
          value={accountType}
          onValueChange={setAccountType}
        />
      </SubscriptionsCard>
      {accountType === 'business' && (
        <SubscriptionsCard title={t('changeSubscription')}>
          <RadioButtonGroup
            items={COST_TYPE}
            value={costType}
            onValueChange={setCostType}
          />
        </SubscriptionsCard>
      )}
      <div className={s.paymentMethods}>
        <Button
          className={s.iconBtn}
          onClick={() => openPaymentModal('stripe')}
        >
          <StripeSvgrepoCom4
            height={64}
            width={96}
          />
        </Button>
        {t('or')}
        <Button
          className={s.iconBtn}
          onClick={() => openPaymentModal('paypal')}
        >
          <PaypalSvgrepoCom4
            height={64}
            width={96}
          />
        </Button>
      </div>
      {paymentModal && (
        <PaymentModal
          closePaymentModal={closePaymentModal}
          handleSubscribe={handleSubscribe}
          iAgree={iAgree}
          isPending={isPending}
          toggleIAgree={toggleIAgree}
        />
      )}

      {resultModal && (
        <ResultModal
          resultModal={resultModal}
          closeResultModal={closeResultModal}
        />
      )}
    </div>
  );
}
