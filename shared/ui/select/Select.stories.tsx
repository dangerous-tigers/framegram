import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '@/shared/ui/select/Select';
import { langs } from '@/shared/ui/select/langs';

const meta = {
  title: 'ui/select/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    options: langs,
    sizes: 'medium',
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return <Select options={langs} disabled={false} sizes={'medium'} />;
  },
};

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const Small: Story = {
  args: {},
  render: () => {
    return <Select options={langs} disabled={false} sizes={'small'} />;
  },
};

export const SmallDisabled: Story = {
  args: {},
  render: () => {
    return <Select options={langs} disabled={true} sizes={'small'} />;
  },
};
