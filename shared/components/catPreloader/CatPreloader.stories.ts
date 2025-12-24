import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CatPreloader } from './CatPreloader';

const meta = {
  title: 'shared/components/CatPreloader',
  component: CatPreloader,
  tags: ['autodocs'],
} satisfies Meta<typeof CatPreloader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
