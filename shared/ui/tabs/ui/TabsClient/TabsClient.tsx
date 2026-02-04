'use client';
import { Tabs } from 'radix-ui';

import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';

import s from './tabsClient.module.scss';

type PropsTabsClient = {
  defaultValue: string;
  handleTabChange: (tabValue: string) => void;
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
};

export const TabsClient = ({ defaultValue, tabs, handleTabChange }: PropsTabsClient) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Tabs.Root
      orientation={isMobile ? 'vertical' : 'horizontal'}
      defaultValue={defaultValue}
    >
      <Tabs.List className={s.triggerList}>
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={s.trigger}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.value)}
            data-direction
          >
            <span>{tab.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          className={s.content}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
