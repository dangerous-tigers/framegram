import { Label, RadioGroup } from 'radix-ui';

import { RadioGroupItemProps } from '@/shared/ui/radioGroup/RadioGroup.types';

import s from '@/shared/ui/radioGroup/RadioGroup.module.scss';

export const RadioGroupItem = ({ value, label, disabled }: RadioGroupItemProps) => {
  return (
    <Label.Root className={s.radio__item}>
      <RadioGroup.Item
        className={s.radio__input}
        value={value}
        disabled={disabled}
      >
        <RadioGroup.Indicator className={s.radioIndicator} />
      </RadioGroup.Item>
      <span className={s.radiLabel}>{label}</span>
    </Label.Root>
  );
};
