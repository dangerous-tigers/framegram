import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Notifications } from './Notifications';

const meta: Meta<typeof Notifications> = {
  title: 'Widgets/Header/Notifications',
  component: Notifications,
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  args: {
    className: '',
  },
};
