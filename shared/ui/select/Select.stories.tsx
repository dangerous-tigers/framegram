import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';
import { Select } from '@/shared/ui/select/Select';

const meta = {
  title: 'ui/select/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Select',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Select',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Select',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Select',
  },
};
