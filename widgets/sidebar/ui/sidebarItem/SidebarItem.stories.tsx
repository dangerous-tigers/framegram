import React from 'react';
import { SidebarItem } from './SidebarItem';
import { HomeOutline, PlusSquareOutline } from '@/assets/icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof SidebarItem> = {
  title: 'Widgets/Sidebar/SidebarItem',
  component: SidebarItem,
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
