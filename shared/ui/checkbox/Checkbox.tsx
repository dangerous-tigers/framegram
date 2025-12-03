import * as RadixCheckbox from '@radix-ui/react-checkbox';
import styles from './Checkbox.module.scss';
import { useId } from 'react';
import { CheckboxSelected } from '@/assets/icons';

type Props = {
  checked?: boolean;
  onCheckedChange?: () => void;
  label?: string;
  disabled?: boolean;
  id?: string;
};

export const Checkbox = ({ label, checked, onCheckedChange, id, disabled, ...rest }: Props) => {
  const uniqueId = useId();
  const resolvedId = id ?? uniqueId;

  return (
    <label className={`${styles.Label} ${disabled ? styles.disabled : ''}`} htmlFor={resolvedId}>
      <div className={`${styles.Wrapper} ${disabled ? styles.disabled : ''}`}>
        <RadixCheckbox.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={styles.Root}
          id={resolvedId}
          {...rest}
        >
          <RadixCheckbox.Indicator className={styles.Indicator}>
            <CheckboxSelected />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
      </div>
      {label}
    </label>
  );
};
