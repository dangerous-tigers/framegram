import clsx from 'clsx';

import { TabsClient } from '@/shared/ui/tabs/ui/TabsClient';

type PropsTabs = {
  className?: string;
  defaultValue?: string;
  handleTabChange: (tabValue: string) => void;
  tabs: { value: string; label: string; content: React.ReactNode; disabled?: boolean }[];
};

export const Tabs = (props: PropsTabs) => {
  const { className, defaultValue, tabs, handleTabChange } = props;

  return (
    <div className={clsx(className)}>
      <TabsClient
        handleTabChange={handleTabChange}
        tabs={tabs}
        defaultValue={defaultValue || tabs[0].value}
      ></TabsClient>
    </div>
  );
};
