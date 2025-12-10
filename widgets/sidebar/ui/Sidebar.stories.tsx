import { Sidebar } from './Sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar/Sidebar',
  component: Sidebar,
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {},
};
