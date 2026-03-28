import { useState } from 'react';
import { fn } from 'storybook/test';

import { ArrowIosBackOutline } from '@/assets/icons';
import * as Dialog from '@radix-ui/react-dialog';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Modal, type Props } from './BaseModal';
import { ModalHeaderWithClose } from './ModalHeaderWithClose';
import { ModalHeaderWithNext } from './ModalHeaderWithNext';

import styles from './ModalHeader.module.scss';

const meta = {
  title: 'ui/modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
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

export const ConfirmModal: StoryObj<Props> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal
          size='sm'
          onOpenChange={handleClose}
          open={open}
          header={
            <ModalHeaderWithClose
              title='Modal title'
              onClose={handleClose}
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
            <p>We have sent a link to confirm your email to epam@epam.com</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={handleClose}>Cancel</button>
              <button
                onClick={() => {
                  alert('Save');
                  setOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// Модалка с кнопками Back и Next (для crop/filters)
export const CropModal: StoryObj<Props> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleNext = () => {
      alert('Next clicked');
    };
    const handleBack = () => {
      alert('Back clicked');
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal
          size='md'
          onOpenChange={handleClose}
          open={open}
          header={
            <ModalHeaderWithNext
              title='Cropping'
              onBack={handleBack}
              onNext={handleNext}
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
            <p>Crop content here</p>
          </div>
        </Modal>
      </>
    );
  },
};

// Большая модалка со списком (followers)
export const FollowersModal: StoryObj<Props> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal
          size='lg'
          onOpenChange={handleClose}
          open={open}
          header={
            <ModalHeaderWithClose
              title='2 258 Following'
              onClose={handleClose}
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px' }}>
            <p>List of followers</p>
            {[...Array(20).fill(null)].map((_, index) => (
              <div key={index}>
                <p>user {index}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
export const FiltersModal: StoryObj<Props> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal
          size='xl'
          onOpenChange={handleClose}
          open={open}
          header={
            <>
              <button
                className={styles.iconButton}
                onClick={() => {
                  alert('Back');
                }}
                type='button'
                aria-label='Back'
              >
                <ArrowIosBackOutline />
              </button>
              <Dialog.Title asChild>
                <h2 className={styles.title}>{'Filters'}</h2>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  onClick={() => {
                    alert('Next');
                  }}
                >
                  Next
                </button>
              </Dialog.Close>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
            <p>We have sent a link to confirm your email to epam@epam.com</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={handleClose}>Cancel</button>
              <button
                onClick={() => {
                  alert('Save');
                  setOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
