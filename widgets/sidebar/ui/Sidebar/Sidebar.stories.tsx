import { Sidebar } from './Sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
};

export default meta;

export const Default: StoryObj<typeof Sidebar> = {
  render: () => <Sidebar />,
};
