import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
