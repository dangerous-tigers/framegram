'use client';
import { Tabs } from 'radix-ui';

import s from './tabsClient.module.scss';

import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';

type PropsTabsClient = {
  defaultValue: string;
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
};

export const TabsClient = (props: PropsTabsClient) => {
  const { defaultValue, tabs } = props;

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
