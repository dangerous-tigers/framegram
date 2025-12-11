import { RadioGroup } from 'radix-ui';
import s from './RadioGroup.module.scss';
import { RadioGroupItem } from '@/shared/ui/radioGroup/RadioGroupItem/RadioGroupItem';
import { RadioGroupProps } from '@/shared/ui/radioGroup/RadioGroup.types';

export const RadioButtonGroup = ({ required = true, items, ariaLabel }: RadioGroupProps) => {
  return (
    <RadioGroup.Root
      className={s.radio}
      aria-label={ariaLabel}
      required={required}
      defaultValue={items[0]?.value}
    >
      {items.map((item) => (
        <RadioGroupItem
          key={item.value}
          value={item.value}
          label={item.label}
          disabled={item.disabled}
        />
      ))}
    </RadioGroup.Root>
  );
};
