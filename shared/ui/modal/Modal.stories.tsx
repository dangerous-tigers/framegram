import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import { Modal, type Props } from './Modal';
import { useState } from 'react';

const meta = {
  title: 'ui/modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Modal title',
    open: true,
    onOpenChange: fn(),
    children: (
      <div>
        <p>Modal content</p>
        <button onClick={fn()}>cancel</button>
        <button onClick={fn()}>save</button>
      </div>
    ),
  },
};

export const ModalWithState: StoryObj<Props> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal size='sm' onOpenChange={handleClose} open={open} title='Modal Title'>
          <div>
            <p>We have sent a link to confirm your email to epam@epam.com</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={() => setOpen(false)}>Save</button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const Size_sm: Story = {
  args: {
    title: 'Modal title',
    size: 'sm',
    open: true,
    onOpenChange: fn(),
    children: (
      <div>
        <p>Modal size small</p>
      </div>
    ),
  },
};

export const Size_md: Story = {
  args: {
    title: 'Modal title',
    size: 'md',
    open: true,
    onOpenChange: fn(),
    children: (
      <div>
        <p>Modal size middle</p>
      </div>
    ),
  },
};
export const Size_lg: Story = {
  args: {
    title: 'Modal title',
    size: 'lg',
    open: true,
    onOpenChange: fn(),
    children: (
      <div>
        <p>Modal size large</p>
      </div>
    ),
  },
};
