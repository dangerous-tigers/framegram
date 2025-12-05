import * as RadixCheckbox from '@radix-ui/react-checkbox';
import styles from './Checkbox.module.scss';
import { CheckboxSelected } from '@/assets/icons';
import { ComponentPropsWithoutRef } from 'react';

/**
 * checked - состояние чекбокса
 * onCheckedChange - обработчик изменения состояния чекбокса (checked: boolean) => void
 * disabled - заблокированный чекбокс
 * label - текст под чекбоксом
 */

type Props = {
  label?: string;
  disabled?: boolean;
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

export const Checkbox = ({ label, disabled, ...rest }: Props) => {
  return (
    <label className={`${styles.label} ${disabled ? styles.disabled : ''}`}>
      <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
        <RadixCheckbox.Root
          disabled={disabled}
          className={styles.root}
          {...rest}
        >
          <RadixCheckbox.Indicator className={styles.indicator}>
            <CheckboxSelected />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
      </div>
      <span>{label}</span>
    </label>
  );
};
