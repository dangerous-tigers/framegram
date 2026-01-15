import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './Input';

const meta = {
  title: 'UI/input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'search'],
    },
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'text',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with value',
    value: 'Some text',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Disabled value',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with error',
    error: 'This field is required',
    placeholder: 'Enter text...',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    label: 'Search Input',
    placeholder: 'Search...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password with toggle',
    value: 'secret123',
  },
};

export const SearchWithError: Story = {
  args: {
    type: 'search',
    label: 'Search with error',
    error: 'No results found',
    value: 'invalid query',
  },
};
