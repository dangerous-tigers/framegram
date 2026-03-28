import { useState } from 'react';

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons';
import { Option, Select } from '@/shared/ui/select/Select';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

export const langs: Option[] = [
  { value: 'English', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { value: 'Russian', label: 'Russian flag', icon: FlagRussia },
];

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
    variant: 'default',
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
      action: 'has been changed',
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
        variant={'default'}
        width={'210px'}
        value={value}
        onValueChange={(event) => setValue(event)}
      />
    );
  },
};

export const WithText: Story = {
  args: {
    ...meta.args,
    disabled: false,
    options: [
      { value: '0', label: 'Nullish' },
      { value: '5', label: 'Five' },
      { value: '10', label: 'Ten' },
      { value: '20', label: 'Twenty' },
    ],
    value: '0',
    variant: 'text',
    width: '64px',
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
    variant: 'icon',
    width: '64px',
  },
  render: () => {
    const [value, setValue] = useState<string>(String(langs[0].label));

    return (
      <Select
        options={langs}
        disabled={false}
        value={value}
        onValueChange={setValue}
        width={'64px'}
        variant={'icon'}
      />
    );
  },
};

export const WithIconDisabled: Story = {
  args: {
    ...meta.args,
    disabled: true,
    variant: 'icon',
    width: '64px',
  },
};
