import { useEffect, useMemo, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';

import { AccountType, SubscriptionType } from './types';
import { useCancelAutoRenewal } from './useCancelAutoRenewal';
import { useGetMySubscription } from './useGetSubscription';
import { useRenewAutoRenewal } from './useRenewAutoRenewal';

export function useSubscriptionState() {
  const { data: subscription } = useGetMySubscription();

  const cancelAutoRenewal = useCancelAutoRenewal();
  const renewAutoSubscriptions = useRenewAutoRenewal();

  const format = useFormatter();
  const lastSubscription = subscription?.data.at(-1);
  const formattedDateEnd = format.dateTime(new Date(lastSubscription?.endDateOfSubscription || ''), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const lastSub = { ...lastSubscription, formattedDateEnd };

  const t = useTranslations('profile.settings.accountManagement');

  const isSubscriptionActive = lastSubscription && new Date(lastSubscription.endDateOfSubscription) > new Date();

  const [accountType, setAccountType] = useState('personal');
  const [costType, setCostType] = useState('10');

  const ACCOUNT_TYPE = useMemo(
    () => [
      { label: t('personal'), value: 'personal' as const satisfies AccountType },
      { label: t('business'), value: 'business' as const satisfies AccountType },
    ],
    [t],
  );

  const COST_TYPE = useMemo(
    () => [
      {
        label: `$10 ${t('per')} ${t('days', { count: 1 })}`,
        value: '10',
        typeSubscription: 'DAY' as const satisfies SubscriptionType,
      },
      {
        label: `$50 ${t('per')} ${t('weekly', { count: 7 })}`,
        value: '50',
        typeSubscription: 'WEEKLY' as const satisfies SubscriptionType,
      },
      {
        label: `$100 ${t('per')} ${t('monthly')}`,
        value: '100',
        typeSubscription: 'MONTHLY' as const satisfies SubscriptionType,
      },
    ],
    [t],
  );
  useEffect(() => {
    if (!subscription) return;

    if (subscription.hasAutoRenewal) {
      setAccountType('business');
    } else if (!isSubscriptionActive) {
      setAccountType('personal');
    } else {
      setAccountType('business');
    }
  }, [subscription, isSubscriptionActive]);

  function handleCancelAutoRenewal(checked: boolean) {
    if (checked) {
      renewAutoSubscriptions.mutate();
    } else {
      cancelAutoRenewal.mutate();
    }
  }

  return {
    subscription,
    ACCOUNT_TYPE,
    COST_TYPE,
    accountType,
    setAccountType,
    costType,
    setCostType,
    isSubscriptionActive,
    lastSubscription: lastSub,
    handleCancelAutoRenewal,
  };
}
