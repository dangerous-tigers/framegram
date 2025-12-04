import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { Button } from '@/shared/ui/button/Button';

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
    variant: 'primary',
    children: 'Button primary',
    type: 'button',
    onClick: onClickHandler,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button secondary',
    type: 'button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button outline',
    type: 'button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button text',
    type: 'button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Button disabled',
    type: 'button',
  },
};
