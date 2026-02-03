'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

import type { PaymentType, SubscriptionType } from '../model';
import { useSubscription } from '../model';

export type PaymentModalType = 'stripe' | 'paypal' | null;
export type ResultModalType = 'success' | 'error' | null;

interface UseSubscriptionModalsProps {
  costType: string;
  COST_TYPE: {
    label: string;
    value: string;
    typeSubscription: SubscriptionType;
  }[];
}

export function useSubscriptionModals({ costType, COST_TYPE }: UseSubscriptionModalsProps) {
  const t = useTranslations('profile.settings.accountManagement');
  const { show } = useAlertStore();
  const createSubscription = useSubscription();
  const params = useSearchParams();
  const router = useRouter();

  const [resultModal, setResultModal] = useState<ResultModalType>(null);
  const [paymentModal, setPaymentModal] = useState<PaymentModalType>(null);
  const [iAgree, setIAgree] = useState(false);

  useEffect(() => {
    if (params.get('success')) {
      setResultModal('success');
    }
    if (params.get('error')) {
      setResultModal('error');
    }
  }, [params]);

  function openPaymentModal(type: PaymentModalType) {
    setPaymentModal(type);
    setIAgree(false);
  }

  function closePaymentModal() {
    setPaymentModal(null);
    setIAgree(false);
  }

  function handleSubscribe() {
    if (paymentModal === 'stripe') {
      createSubscription.mutate({
        paymentType: 'STRIPE' as PaymentType,
        typeSubscription: COST_TYPE.find((item) => item.value === costType)?.typeSubscription as SubscriptionType,
        amount: Number(costType),
        baseUrl: `${window.location}`,
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

  function closeResultModal() {
    setResultModal(null);
    router.replace('/profile/settings?tab=account-management');
  }

  function toggleIAgree() {
    setIAgree((prev) => !prev);
  }

  return {
    paymentModal,
    resultModal,
    iAgree,
    isPending: createSubscription.isPending,
    openPaymentModal,
    closePaymentModal,
    handleSubscribe,
    closeResultModal,
    toggleIAgree,
  };
}
