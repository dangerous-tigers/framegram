'use client';
import { Select as SelectPrimitive } from 'radix-ui';
import React, { ComponentProps, forwardRef, ReactElement, ReactNode, useState } from 'react';
import styles from './Select.module.scss';
import ArrowIosDownOutline from '@/assets/icons/components/ArrowIosDownOutline';
import { SelectOption } from '@/shared/ui/select/langs';

type Props = {
  children?: ReactNode;
  options: SelectOption[];
  disabled: boolean;
  sizes: 'small' | 'medium';
};

export const Select = ({ options, disabled, sizes = 'medium', ...props }: Props) => {
  const [value, setValue] = useState<string>(String(options[0].country));

  const selectedItem = options.find((o) => String(o.country) === value) ?? options[0];
  const SelectedItemIcon = selectedItem.icon;

  const onChangeHandler = (value: string) => {
    setValue(value);
  };

  return (
    <SelectPrimitive.Root {...props} value={value} onValueChange={(value) => onChangeHandler(value)}>
      <SelectPrimitive.Trigger disabled={disabled} asChild aria-label='Select language'>
        <TriggerInner className={sizes === 'medium' ? styles.trigger : styles.triggerSmall}>
          <SelectPrimitive.Icon className={sizes === 'medium' ? styles.iconSmall : styles.icon} asChild>
            <SelectedItemIcon />
          </SelectPrimitive.Icon>
          <SelectPrimitive.Value aria-label={value}>{sizes === 'medium' && selectedItem.country}</SelectPrimitive.Value>
          <ArrowIosDownOutline height={sizes === 'medium' ? 24 : 16} className={styles.arrowDown} />
        </TriggerInner>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          align={'center'}
          alignOffset={0}
          className={sizes === 'medium' ? styles.content : styles.contentSmall}
          position={'popper'}
          side={'bottom'}
        >
          <SelectPrimitive.Viewport>
            {options.map(({ country, label, icon: Flag }) => {
              return (
                <SelectItem
                  className={sizes === 'medium' ? styles.listItem : styles.listItemSmall}
                  sizes={'small'}
                  key={country}
                  country={country}
                  label={label}
                  Component={<Flag />}
                >
                  {sizes === 'medium' && country}
                </SelectItem>
              );
            })}
            <SelectPrimitive.Separator />
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const TriggerInner = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => (
  <div ref={ref} {...props} className={`${styles.triggerInner} ${props.className ?? ''}`} />
));
TriggerInner.displayName = 'TriggerInner';

type SelectItemProps = {
  children: ReactNode;
  label: string;
  country: string;
  sizes: 'small' | 'medium';
  className: string;
  Component: ReactElement;
};

export const SelectItem = ({ children, label, country, className, Component, ...props }: SelectItemProps) => {
  return (
    <SelectPrimitive.Item
      aria-label={label}
      {...props}
      className={`${styles.listItem} ${className ?? ''}`}
      value={country}
      key={country}
    >
      <SelectPrimitive.Icon asChild>{Component}</SelectPrimitive.Icon>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};
