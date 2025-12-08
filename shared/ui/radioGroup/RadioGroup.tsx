import { Label, RadioGroup } from 'radix-ui';
import s from './RadioGroup.module.scss';

export const RadioButtonGroup = () => {
  return (
    <RadioGroup.Root
      className={s.radio}
      defaultValue='default'
      aria-label='View density'
    >
      <Label.Root className={s.radio__item}>
        <RadioGroup.Item
          checked
          disabled
          className={s.radio__input}
          value='default'
          id='r1'
        >
          <RadioGroup.Indicator className={s.radio__indicator} />
        </RadioGroup.Item>
        <span className={s.radio__label}>Default</span>
      </Label.Root>

      <Label.Root className={s.radio__item}>
        <RadioGroup.Item
          className={s.radio__input}
          value='Comfortable'
          id='r1'
        >
          <RadioGroup.Indicator className={s.radio__indicator} />
        </RadioGroup.Item>
        <span className={s.radio__label}>Comfortable</span>
      </Label.Root>
      <Label.Root className={s.radio__item}>
        <RadioGroup.Item
          className={s.radio__input}
          value='Indiator'
          id='r1'
        >
          <RadioGroup.Indicator className={s.radio__indicator} />
        </RadioGroup.Item>
        <span className={s.radio__label}>Indiator</span>
      </Label.Root>
    </RadioGroup.Root>
  );
};
