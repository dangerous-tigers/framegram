import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './Textarea';

// Определяем типы для Storybook
type Story = StoryObj<typeof Textarea>;
type MetaType = Meta<typeof Textarea>;

// Основная конфигурация компонента
const meta: MetaType = {
  title: 'UI/textarea/Textarea',
  component: Textarea,
  tags: ['autodocs'],

  args: {
    placeholder: 'Enter text...',
    label: 'Label',
    direction: 'vertical',
  },
};

export default meta;

export const Default: Story = {
  args: {
    direction: 'vertical',
  },
};

// Сценарий с длинным текстом
export const WithLongText: Story = {
  args: {
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
};

export const WithError: Story = {
  args: {
    error: 'Some Error',
    direction: 'vertical',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled',
  },
};

export const directionBoth: Story = {
  args: {
    direction: 'both',
  },
};

export const directionNone: Story = {
  args: {
    direction: 'none',
  },
};
