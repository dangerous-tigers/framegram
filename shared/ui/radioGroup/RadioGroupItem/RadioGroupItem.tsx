import { RadioGroupItemProps } from '@/shared/ui/radioGroup/RadioGroup.types';
import * as RadioGroup from '@radix-ui/react-radio-group';

import s from '@/shared/ui/radioGroup/RadioGroup.module.scss';

export const RadioGroupItem = ({ value, label, disabled }: RadioGroupItemProps) => {
  return (
    <label className={s.radio__item}>
      <RadioGroup.Item
        className={s.radio__input}
        value={value}
        disabled={disabled}
      >
        <RadioGroup.Indicator className={s.radio__indicator} />
      </RadioGroup.Item>
      <span className={s.radio__label}>{label}</span>
    </label>
  );
};
