import clsx from 'clsx';
import { TabsClient } from '@/shared/ui/tabs/ui/TabsClient';

type PropsTabs = {
  className?: string;
  defaultValue?: string;
  tabs: { value: string; label: string; content: React.ReactNode; disabled?: boolean }[];
};

export const Tabs = (props: PropsTabs) => {
  const { className, defaultValue, tabs } = props;

  return (
    <div className={clsx(className)}>
      <TabsClient
        tabs={tabs}
        defaultValue={defaultValue || tabs[0].value}
      ></TabsClient>
    </div>
  );
};
