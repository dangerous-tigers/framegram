import { useState } from 'react';
import { boolean } from 'zod';

import { Popover } from '@/shared/ui/popover';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'ui/popover/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'black' },
  },
  tags: ['autodocs'],
  args: {
    open: false,
    isOwner: false,
    isAuthorized: false,
    isFollow: false,
  },
  argTypes: {
    open: {
      control: boolean,
      description: 'popver state',
    },
    onOpenChange: { action: 'popover state has been changed`' },
    editPost: {
      action: 'Calling up textarea for editing post description',
    },
    removePost: {
      action: 'post has been removed',
    },
    follow: {
      action: 'user has been followed',
    },
    unfollow: {
      action: 'user has been unfollowed',
    },
    copyLink: {
      action: 'link has been copied',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerPopover: Story = {
  args: { ...meta.args, isOwner: true, isAuthorized: true },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover
        isOwner={true}
        isAuthorized={true}
        open={open}
        onOpenChange={() => setOpen(!open)}
      />
    );
  },
};

export const ViewerPopoverFollow: Story = {
  args: { ...meta.args, isOwner: false, isAuthorized: true },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover
        isOwner={false}
        isAuthorized={true}
        isFollow={false}
        open={open}
        onOpenChange={() => setOpen(!open)}
      />
    );
  },
};
export const ViewerPopoverUnfollow: Story = {
  args: { ...meta.args, isOwner: false, isAuthorized: true },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover
        isOwner={false}
        isAuthorized={true}
        isFollow={true}
        open={open}
        onOpenChange={() => setOpen(!open)}
      />
    );
  },
};

export const UnauthorizedPopover: Story = {
  args: { ...meta.args, isOwner: false, isAuthorized: false },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover
        isOwner={false}
        isAuthorized={false}
        open={open}
        onOpenChange={() => setOpen(!open)}
      />
    );
  },
};
