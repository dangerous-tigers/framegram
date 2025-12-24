import { RadioButtonGroup } from '@/shared/ui/radioGroup/RadioGroup';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Shared/RadioButtonGroup',
  component: RadioButtonGroup,
  args: {
    ariaLabel: 'Options',
    required: true,
    items: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C', disabled: true },
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof RadioButtonGroup> = {
  render: (args) => <RadioButtonGroup {...args} />,
};

export const WithDisabled: StoryObj<typeof RadioButtonGroup> = {
  args: {
    items: [
      { value: '1', label: 'Enabled' },
      { value: '2', label: 'Disabled', disabled: true },
    ],
  },
};

export const ManyOptions: StoryObj<typeof RadioButtonGroup> = {
  args: {
    items: Array.from({ length: 6 }).map((_, i) => ({
      value: `v${i}`,
      label: `Option ${i + 1}`,
    })),
  },
};
