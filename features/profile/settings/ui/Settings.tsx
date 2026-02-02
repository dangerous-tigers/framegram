'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ArrowBackOutline } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { AccountManagement, Devices, General, Payments } from '@/features/profile/settings';
import { Tabs } from '@/shared/ui/tabs/ui/Tabs';

import s from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('profile.settings');
  const TABS = [
    { value: 'general', label: t('general'), content: <General /> },
    { value: 'devices', label: t('devices'), content: <Devices /> },
    { value: 'account-management', label: t('accountManagement'), content: <AccountManagement /> },
    { value: 'payments', label: t('payments'), content: <Payments /> },
  ];

  const router = useRouter();
  const params = useSearchParams();

  const { data } = useMe();

  const activeTab = params.get('tab');

  const handleBack = () => {
    router.replace(`/profile/${data?.userId}`);
    router.refresh();
  };

  const activeTabIndex = TABS.find((item) => item.value === activeTab);

  const handleTabChange = (tabValue: string) => {
    const tab = new URLSearchParams(params);
    tab.set('tab', tabValue);
    router.replace(`?${tab}`);
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <ArrowBackOutline onClick={handleBack} />
        <h2>Settings</h2>
        <ArrowBackOutline onClick={router.back} />
        <h2>{t('title')}</h2>
      </div>
      <Tabs
        tabs={TABS}
        handleTabChange={handleTabChange}
        defaultValue={activeTabIndex?.value}
        className={s.tabs}
      />
    </div>
  );
};
