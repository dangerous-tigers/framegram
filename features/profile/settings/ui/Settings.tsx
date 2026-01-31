'use client';

import { useRouter } from 'next/navigation';

import { ArrowBackOutline } from '@/assets/icons';
import { AccountManagement, Devices, General, Payments } from '@/features/profile/settings';
import { Tabs } from '@/shared/ui/tabs/ui/Tabs';

import s from './Settings.module.scss';

const TABS = [
  { value: 'general', label: 'General', content: <General /> },
  { value: 'devices', label: 'Devices', content: <Devices /> },
  { value: 'account-management', label: 'Account Management', content: <AccountManagement /> },
  { value: 'payments', label: 'Payments', content: <Payments /> },
];

export const Settings = () => {
  const router = useRouter();

  return (
    <div className={s.container}>
      <div className={s.title}>
        <ArrowBackOutline onClick={router.back} />
        <h2>Settings</h2>
      </div>
      <Tabs
        tabs={TABS}
        className={s.tabs}
      />
    </div>
  );
};
