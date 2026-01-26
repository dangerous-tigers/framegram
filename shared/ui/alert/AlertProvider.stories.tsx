import { Meta, type StoryObj } from '@storybook/nextjs-vite';

import { Alert } from '@/shared/ui/alert/Alert';
import { AlertProvider } from '@/shared/ui/alert/AlertProvider';
import { alertDecorator } from '@/storybook/alertDecorator';

const meta = {
  component: AlertProvider,
  args: {
    duration: 5000,
    swipeDirection: 'right',
    swipeThreshold: 50,
  },
  argTypes: {
    duration: {
      control: 'number',
      description: 'The time in milliseconds that should elapse before automatically closing each toast.',
    },
    swipeDirection: {
      control: 'select',
      description: 'The direction of the pointer swipe that should close the toast.',
    },
    swipeThreshold: {
      control: 'number',
      description: 'The distance in pixels that the swipe gesture must travel before a close is triggered.',
    },
  },
} satisfies Meta<typeof AlertProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertProviderSettings: Story = {
  args: {
    ...meta.args,
    children: <Alert />,
  },
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
