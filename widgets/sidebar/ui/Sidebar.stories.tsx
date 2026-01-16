import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Sidebar } from './Sidebar/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar/Sidebar',
  component: Sidebar,
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {},
};
