import { RadioGroup } from 'radix-ui';
import { ComponentPropsWithoutRef } from 'react';

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  checked?: boolean;
};

export type RadioGroupProps = {
  required?: boolean;
  items: RadioOption[];
  ariaLabel?: string;
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>;

export type RadioGroupItemProps = {
  value: string;
  label: string;
  disabled?: boolean;
};
