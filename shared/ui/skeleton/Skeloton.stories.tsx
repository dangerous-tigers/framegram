import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'ui/skeleton/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSkeloton: Story = {
  args: {},
  render: (args) => (
    <Skeleton
      {...args}
      style={{ height: 300, width: 300 }}
    />
  ),
};

export const RoundedSkeleton: Story = {
  render: (args) => (
    <Skeleton
      {...args}
      style={{ borderRadius: '50%', height: 300, width: 300 }}
    />
  ),
};
