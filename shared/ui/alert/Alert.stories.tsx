import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Alert } from '@/shared/ui/alert/Alert';
import { alertDecorator } from '@/storybook/alertDecorator';

const meta: Meta<typeof Alert> = {
  title: 'ui/alert/Alert',
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const DefaultSuccess: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'success',
      variant: 'default',
      error: null,
      description: 'Something went wrong',
    }),
  ],
};

export const DefaultError: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'error',
      variant: 'default',
      error: 'Error occurred',
      description: null,
    }),
  ],
};

export const FilledSuccess: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'success',
      variant: 'filled',
      error: null,
      description: 'Something went wrong',
    }),
  ],
};

export const FilledError: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'error',
      variant: 'filled',
      error: 'Error occurred',
      description: null,
    }),
  ],
};

export const OutlinedSuccess: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'success',
      variant: 'outlined',
      error: null,
      description: 'Something went wrong',
    }),
  ],
};

export const OutlinedError: Story = {
  decorators: [
    alertDecorator({
      open: true,
      severity: 'error',
      variant: 'outlined',
      error: 'Error occurred',
      description: null,
    }),
  ],
};
