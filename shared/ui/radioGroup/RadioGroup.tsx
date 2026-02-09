import { RadioGroupProps } from '@/shared/ui/radioGroup/RadioGroup.types';
import { RadioGroupItem } from '@/shared/ui/radioGroup/RadioGroupItem/RadioGroupItem';
import * as RadioGroup from '@radix-ui/react-radio-group';

import s from './RadioGroup.module.scss';

export const RadioButtonGroup = ({ required = true, items, ariaLabel, ...rest }: RadioGroupProps) => {
  return (
    <RadioGroup.Root
      className={s.radio}
      aria-label={ariaLabel}
      required={required}
      defaultValue={items[0]?.value}
      {...rest}
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
