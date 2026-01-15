import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageManager } from './ImageManager';

const meta = {
  title: 'shared/components/ImageManager',
  component: ImageManager,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ImageManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InContext: Story = {
  args: {},
  decorators: [(Story) => <Story />],
};
