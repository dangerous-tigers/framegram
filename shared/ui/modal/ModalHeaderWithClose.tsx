import * as Dialog from '@radix-ui/react-dialog';
import type { KeyboardEvent } from 'react';

import styles from './ModalHeader.module.scss';

import { Close } from '@/assets/icons';

export const ModalHeaderWithClose = ({
  title,
  onClose,
  onKeyPress,
}: {
  title: string;
  onClose: () => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}) => {
  return (
    <div className={styles.header}>
      <Dialog.Title asChild>
        <h2 className={styles.title}>{title}</h2>
      </Dialog.Title>
      <Dialog.Close
        className={styles.iconButton}
        aria-label='Close'
        type='button'
        onClick={onClose}
        onKeyUp={onKeyPress}
      >
        <Close />
      </Dialog.Close>
    </div>
  );
};
