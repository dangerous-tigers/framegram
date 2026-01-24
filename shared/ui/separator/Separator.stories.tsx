import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './Separator';

const meta = {
  title: 'ui/separator/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalSeparator: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div style={{ height: '300px' }}>
      <Separator {...args} />
    </div>
  ),
};

export const HorizontalSeparator: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Separator {...args} />
    </div>
  ),
};
