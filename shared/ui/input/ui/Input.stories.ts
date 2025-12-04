import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta = {
  title: 'ui/input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: '',
    onChange: () => void 0,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Password: Story = {
  args: {
    label: 'Pass',
    type: 'password',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    disabled: true,
    value: 'Disabled input',
  },
};

export const Error: Story = {
  args: {
    label: 'Username',
    value: 'Name',
    error: 'Error text',
  },
};
