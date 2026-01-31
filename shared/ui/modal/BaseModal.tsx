import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

import styles from './BaseModal.module.scss';
/**
 * @description Компонент модального окна
 * @see https://www.radix-ui.com/docs/primitives/components/dialog
 * header - Заголовок модального окна
 * children - Контент модального окна
 * size - Размер модального окна
 * showDivider - Показывать разделитель
 * className - Класс модального окна
 * open - Открыто ли модальное окно
 * onOpenChange - Обработчик изменения состояния модального окна (open: boolean) => void
 */
export type Props = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
  size?:
    | 'sm' // Размер для confirm modal
    | 'md' // Размер по умолчанию/crop modal
    | 'lg' // Размер для followers
    | 'xl'; // Размер для filters/publication
  showDivider?: boolean; // Рaзделитель
  portal?: boolean; // Использовать портал
} & ComponentPropsWithoutRef<typeof Dialog.Root>;

export const Modal = ({
  header,
  children,
  size = 'md',
  showDivider = true,
  className,
  portal = true,
  ...rest
}: Props) => {
  const sizeClass = styles[`content--${size}`] || '';

  const DialogPortal = portal ? Dialog.Portal : React.Fragment;

  return (
    <Dialog.Root {...rest}>
      <DialogPortal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          aria-describedby={'modal'}
          className={`${styles.content} ${sizeClass} ${className || ''}`}
        >
          <Dialog.Description id='modal' />
          <DialogTitle />
          {header && (
            <>
              <div className={styles.header}>{header}</div>
              {showDivider && <div className={styles.divider} />}
            </>
          )}

          <div className={styles.body}>{children}</div>
        </Dialog.Content>
      </DialogPortal>
    </Dialog.Root>
  );
};
