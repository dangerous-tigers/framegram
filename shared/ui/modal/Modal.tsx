import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.scss';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Close } from '@/assets/icons';

export type Props = {
  title: ReactNode;
  children: ReactNode;
  showClose?: boolean;
  open: boolean;
  onOpenChange: () => void;
  size?: 'sm' | 'md' | 'lg';
} & ComponentPropsWithoutRef<'div'>;

export const Modal = ({
  title,
  children,
  showClose = true,
  open,
  onOpenChange,
  size = 'md',
  ...contentProps
}: Props) => {
  const sizeClass = styles[`Content--${size}`] || '';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.Overlay}`} />
        <Dialog.Content className={`${styles.Content} ${sizeClass}`} {...contentProps}>
          <div className={styles.Header}>
            {title && (
              <Dialog.Title asChild>
                <h2 className={styles.Title}>{title}</h2>
              </Dialog.Title>
            )}
            {showClose && (
              <Dialog.Close asChild>
                <button className={styles.IconButton} aria-label='Close' type='button'>
                  <Close />
                </button>
              </Dialog.Close>
            )}
          </div>
          <div className={styles.Divider} />
          <div className={styles.Body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
