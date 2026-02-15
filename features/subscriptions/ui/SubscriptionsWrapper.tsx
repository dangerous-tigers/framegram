import { useTranslations } from 'next-intl';

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons';
import { Button, Checkbox, RadioButtonGroup } from '@/shared/ui';

import { useSubscriptionModals, useSubscriptionState } from '../model';

import { PaymentModal, ResultModal } from './modal';
import { SubscriptionsCard } from './SubscriptionsCard';

import s from './SubscriptionsWrapper.module.scss';

export function SubscriptionsWrapper() {
  const t = useTranslations('profile.settings.accountManagement');

  const {
    subscription,
    costType,
    ACCOUNT_TYPE,
    COST_TYPE,
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
              <span>{lastSubscription.formattedDateEnd}</span>
            </div>
            <div className={s.currentHeader}>
              <p>{t('nextPayment')}</p>
              <span>{subscription?.hasAutoRenewal ? lastSubscription.formattedDateEnd : t('disabled')}</span>
            </div>
          </div>
        </SubscriptionsCard>
      )}
      <Checkbox
        label={t('autoRenewal')}
        checked={subscription?.hasAutoRenewal}
        onCheckedChange={handleCancelAutoRenewal}
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
