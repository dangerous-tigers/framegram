import { ReactElement, ReactNode } from 'react';

import * as PrimitiveSelect from '@radix-ui/react-select';

type Props = {
  children: ReactNode;
  label: string;
  value: string;
  className: string;
  Component: ReactElement | ReactNode;
};

export const SelectItem = ({ children, label, value, className, Component, ...props }: Props) => {
  return (
    <PrimitiveSelect.Item
      aria-label={label}
      {...props}
      className={className}
      value={value}
    >
      <PrimitiveSelect.Icon asChild>{Component}</PrimitiveSelect.Icon>
      <PrimitiveSelect.ItemText>{children}</PrimitiveSelect.ItemText>
    </PrimitiveSelect.Item>
  );
};
