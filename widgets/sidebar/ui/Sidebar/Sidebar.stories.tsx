import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
};

export default meta;

export const Default: StoryObj<typeof Sidebar> = {
  render: () => <Sidebar />,
};
