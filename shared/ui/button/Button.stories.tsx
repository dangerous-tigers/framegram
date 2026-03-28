import { action } from 'storybook/actions';

import { Button } from '@/shared/ui/button/Button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text'],
    },
    type: {
      control: 'select',
      options: ['button', 'reset', 'submit'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const onClickHandler = action('Click');

export const Primary: Story = {
  args: {
    children: 'Button primary',
    onClick: onClickHandler,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button outline',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button text',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Button disabled',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Button full width',
    fullWidth: true,
  },
};
