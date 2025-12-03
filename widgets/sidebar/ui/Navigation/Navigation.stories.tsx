import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Widgets/Sidebar/Navigation',
  component: Navigation,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Navigation> = {
  args: {},
  render: (args) => <Navigation {...args} />,
};
