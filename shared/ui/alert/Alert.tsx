import * as Toast from '@radix-ui/react-toast';
import styles from './Alert.module.scss';
import clsx from 'clsx';
import { CloseOutline } from '@/assets/icons';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';

export const Alert = () => {
  const { open, hide, error, description, severity, variant } = useAlertStore();

  return (
    <Toast.Root
      open={open}
      onOpenChange={(v) => !v && hide()}
      type={'foreground'}
      className={clsx(
        styles.root,
        severity === 'error' && styles.error,
        severity === 'error' && variant === 'outlined' && styles.outlinedError,
        severity === 'error' && variant === 'filled' && styles.filledError,
        severity === 'success' && styles.success,
        severity === 'success' && variant === 'outlined' && styles.outlinedSuccess,
        severity === 'success' && variant === 'filled' && styles.filledSuccess,
        'sssssssssssssssssssssssssssssss',
      )}
      defaultOpen
    >
      <Toast.Description className={styles.description}>{error ? error : description}</Toast.Description>

      <Toast.Close
        className={styles.close}
        aria-label={'Close'}
      >
        <CloseOutline />
      </Toast.Close>
    </Toast.Root>
  );
};
