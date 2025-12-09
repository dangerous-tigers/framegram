import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from '@/shared/ui/alert/Alert';
import { useState } from 'react';

const meta = {
  title: 'ui/alert/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'black' },
  },
  tags: ['autodocs'],
  args: {
    description: '',
    error: '',
    severity: 'success',
    open: true,
  },
  argTypes: {
    onOpenChange: {
      action: 'has been closed',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSuccess: Story = {
  args: { ...meta.args, variant: 'default' },
  render: () => {
    const [open, setOpen] = useState<boolean>(true);

    return (
      <Alert
        description={'Your settings are saved.'}
        variant={'default'}
        severity={'success'}
        open={open}
        onOpenChange={setOpen}
      />
    );
  },
};
export const SuccessOutlined: Story = {
  args: { ...meta.args, variant: 'outlined', description: 'Your settings are saved.' },
};

export const SuccessFilled: Story = {
  args: { ...meta.args, variant: 'filled', description: 'Your settings are saved.' },
};

export const ErrorOutlined: Story = {
  args: {
    error: 'Server is not available.',
    variant: 'outlined',
    severity: 'error',
  },
};
export const ErrorFilled: Story = {
  args: {
    error: 'Server is not available.',
    variant: 'filled',
    severity: 'error',
  },
};
export const DefaultError: Story = {
  args: { ...meta.args, variant: 'default' },
  render: () => {
    const [open, setOpen] = useState<boolean>(true);

    return (
      <Alert
        error={'Server is not available.'}
        variant={'default'}
        severity={'error'}
        open={open}
        onOpenChange={setOpen}
      />
    );
  },
};
