import React from 'react';

import { HomeOutline, PlusSquareOutline } from '@/assets/icons';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof SidebarItem> = {
  title: 'Widgets/Sidebar/SidebarItem',
  component: SidebarItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Home: Story = {
  args: {
    href: '/',
    Component: <HomeOutline />,
    children: 'Feed',
  },
};

export const Create: Story = {
  args: {
    href: '/create',
    Component: <PlusSquareOutline />,
    children: 'Create',
  },
};
