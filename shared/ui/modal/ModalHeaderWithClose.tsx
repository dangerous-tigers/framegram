import * as Dialog from '@radix-ui/react-dialog';
import styles from './ModalHeader.module.scss';
import { Close } from '@/assets/icons';

export const ModalHeaderWithClose = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <>
      <Dialog.Title asChild>
        <h2 className={styles.title}>{title}</h2>
      </Dialog.Title>
      <Dialog.Close asChild>
        <button className={styles.iconButton} aria-label='Close' type='button' onClick={onClose}>
          <Close />
        </button>
      </Dialog.Close>
    </>
  );
};
