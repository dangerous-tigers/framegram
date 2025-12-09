import { ComponentPropsWithoutRef } from 'react';
import { RadioGroup } from 'radix-ui';

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  required?: boolean;
  items: RadioOption[];
  ariaLabel?: string;
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>;
