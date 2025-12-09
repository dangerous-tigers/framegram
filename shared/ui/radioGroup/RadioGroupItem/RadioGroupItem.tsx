import s from '@/shared/ui/radioGroup/RadioGroup.module.scss';
import { Label, RadioGroup } from 'radix-ui';

type Props = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const RadioGroupItem = ({ value, label, disabled }: Props) => {
  return (
    <Label.Root className={s.radio__item}>
      <RadioGroup.Item
        className={s.radio__input}
        value={value}
        disabled={disabled}
      >
        <RadioGroup.Indicator className={s.radio__indicator} />
      </RadioGroup.Item>
      <span className={s.radio__label}>{label}</span>
    </Label.Root>
  );
};
