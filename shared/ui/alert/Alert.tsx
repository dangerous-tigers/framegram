import { Close, Description, Provider, Root, Title, Viewport } from '@radix-ui/react-toast';
import styles from './Alert.module.scss';
import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { CloseOutline } from '@/assets/icons';

type Props = {
  description?: string;
  error?: string;
  variant: 'default' | 'filled' | 'outlined';
  severity: 'success' | 'error';
  duration?: number;
} & ComponentPropsWithoutRef<typeof Root>;

const hotkey = 'F8';

export const Alert = ({ description, duration = 5000, variant, severity, error, open, onOpenChange }: Props) => {
  return (
    <Provider
      label={'Notification'}
      swipeDirection={'left'}
      duration={duration}
      swipeThreshold={150}
    >
      <Root
        open={open}
        onOpenChange={onOpenChange}
        type={'foreground'}
        className={clsx(
          styles.root,
          severity === 'error' && styles.error,
          severity === 'error' && variant === 'outlined' && styles.outlinedError,
          severity === 'error' && variant === 'filled' && styles.filledError,
          severity === 'success' && styles.success,
          severity === 'success' && variant === 'outlined' && styles.outlinedSuccess,
          severity === 'success' && variant === 'filled' && styles.filledSuccess,
        )}
        defaultOpen
      >
        <Title className={styles.title}>{error && 'Error!'}</Title>
        <Description className={styles.description}>{error ? error : description}</Description>

        <Close
          className={styles.close}
          aria-label={'Close'}
        >
          <CloseOutline />
        </Close>
      </Root>
      <Viewport
        hotkey={[hotkey]}
        label={`Notifications (${hotkey})`}
      />
    </Provider>
  );
};
