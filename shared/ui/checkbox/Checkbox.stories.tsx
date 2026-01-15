import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'ui/checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {},
};

export const CheckboxChecked: Story = {
  args: {
    checked: true,
  },
};

export const CheckboxWithLabel: Story = {
  args: {
    label: 'Accept terms and conditions.',
  },
};

export const CheckboxDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckboxWithLabelDisabled: Story = {
  args: {
    label: 'Accept terms and conditions.',
    disabled: true,
  },
};
