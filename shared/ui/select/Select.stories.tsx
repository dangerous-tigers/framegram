import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '@/shared/ui/select/Select';
import { langs } from '@/shared/ui/select/langs';
import { useState } from 'react';
import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons';

const meta = {
  title: 'ui/select/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'black' },
  },
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'English', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
      { value: 'Russian', label: 'Russian flag', icon: FlagRussia },
    ],
    value: '',
    disabled: false,
    size: 'medium',
    width: '210px',
  },
  argTypes: {
    options: {
      control: false,
      description: 'options',
    },
    value: {
      control: 'text',
      description: 'selected value',
    },
    onValueChange: {
      action: 'has been selected',
    },
    placeholder: {
      control: 'text',
      description: 'if nothing is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'is disabled',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValue: Story = {
  args: { ...meta.args },
  render: () => {
    const [value, setValue] = useState<string>(String(langs[0].label));

    return (
      <Select
        options={langs}
        disabled={false}
        size={'medium'}
        width={'210px'}
        value={value}
        onValueChange={(event) => setValue(event)}
      />
    );
  },
};

export const WithValueDisabled: Story = {
  args: {
    value: 'English',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    ...meta.args,
    disabled: false,
    size: 'small',
    width: '42px',
  },
  render: () => {
    const [value, setValue] = useState<string>(String(langs[0].label));

    return (
      <Select
        options={langs}
        disabled={false}
        value={value}
        onValueChange={setValue}
        width={'42px'}
        size={'small'}
      />
    );
  },
};

export const WithIconDisabled: Story = {
  args: {
    ...meta.args,
    disabled: true,
    size: 'small',
    width: '42px',
  },
};
