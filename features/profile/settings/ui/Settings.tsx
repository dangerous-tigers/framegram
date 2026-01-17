'use client';

import s from './Settings.module.scss';

import { AccountManagement, Devices, General, Payments } from '@/features/profile/settings';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';
import { Separator } from '@/shared/ui/separator/Separator';
import { Tabs } from '@/shared/ui/tabs/ui/Tabs';

const TABS = [
  { value: 'general', label: 'General', content: <General /> },
  { value: 'devices', label: 'Devices', content: <Devices /> },
  { value: 'account-management', label: 'Account Management', content: <AccountManagement /> },
  { value: 'payments', label: 'Payments', content: <Payments /> },
];

export const Settings = () => {
  return (
    <div className={s.container}>
      <Tabs tabs={TABS} />
      <Separator className={s.separator} />
      <div className={s.buttons}>
        <PolymorphicButton>Save</PolymorphicButton>
      </div>
    </div>
  );
};
