import { ComponentPropsWithoutRef } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';

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
