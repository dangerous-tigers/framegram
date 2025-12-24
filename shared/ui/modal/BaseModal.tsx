import * as Dialog from '@radix-ui/react-dialog';
import styles from './BaseModal.module.scss';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
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
} & ComponentPropsWithoutRef<typeof Dialog.Root>;

export const Modal = ({ header, children, size = 'md', showDivider = true, className, ...rest }: Props) => {
  const sizeClass = styles[`content--${size}`] || '';

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={`${styles.content} ${sizeClass} ${className || ''}`}>
          {header && (
            <>
              <div className={styles.header}>{header}</div>
              {showDivider && <div className={styles.divider} />}
            </>
          )}

          <div className={styles.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
