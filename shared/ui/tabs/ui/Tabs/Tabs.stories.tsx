// Tabs.stories.tsx
import React from 'react';

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Shared/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabsData = [
  { value: 'movies', label: 'Movies', content: <div>Содержимое Movies</div> },
  { value: 'books', label: 'Books', content: <div>Содержимое Books</div> },
  { value: 'music', label: 'Music', content: <div>Содержимое Music</div>, disabled: true },
];

const tabsDataNotDisabled = [
  { value: 'movies', label: 'Movies', content: <div>Содержимое Movies</div> },
  { value: 'books', label: 'Books', content: <div>Содержимое Books</div> },
  { value: 'music', label: 'Music', content: <div>Содержимое Music</div> },
];

export const Default: Story = {
  args: {
    defaultValue: 'movies',
    tabs: tabsData,
  },
};

export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'books',
    tabs: tabsData,
  },
};

export const NotDisabledTab: Story = {
  args: {
    defaultValue: 'books',
    tabs: tabsDataNotDisabled,
  },
};
