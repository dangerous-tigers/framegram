import { ReactElement, ReactNode } from 'react';
import { Icon, Item, ItemText } from '@radix-ui/react-select';

type Props = {
  children: ReactNode;
  label: string;
  country: string;
  sizes: 'small' | 'medium';
  className: string;
  Component: ReactElement;
};

export const SelectItem = ({ children, label, country, className, Component, ...props }: Props) => {
  return (
    <Item
      aria-label={label}
      {...props}
      className={className}
      value={country}
      key={country}
    >
      <Icon asChild>{Component}</Icon>
      <ItemText>{children}</ItemText>
    </Item>
  );
};
