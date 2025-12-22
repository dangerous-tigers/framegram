import { SidebarItem } from './SidebarItem';
import { HomeOutline, PlusSquareOutline } from '@/assets/icons';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof SidebarItem> = {
  title: 'Widgets/Sidebar/SidebarItem',
  component: SidebarItem,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Home: Story = {
  args: {
    item: {
      href: '/',
      Component: HomeOutline,
      label: 'Home',
      disabled: false,
    },
  },
};

export const Create: Story = {
  args: {
    item: {
      href: '/create',
      Component: PlusSquareOutline,
      label: 'Create',
      disabled: false,
    },
  },
};

export const Active: Story = {
  args: {
    item: {
      href: '/',
      Component: HomeOutline,
      label: 'Home',
      disabled: false,
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    item: {
      href: '/disabled',
      Component: PlusSquareOutline,
      label: 'Disabled Item',
      disabled: true,
    },
  },
};

export const WithoutHref: Story = {
  args: {
    item: {
      Component: HomeOutline,
      label: 'No Link',
      disabled: false,
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    item: {
      href: '/icon-only',
      label: '',
      Component: HomeOutline,
      disabled: false,
    },
  },
};
