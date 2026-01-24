import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Widgets/Header/Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
