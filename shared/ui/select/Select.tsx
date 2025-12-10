'use client';
import * as PrimitiveSelect from '@radix-ui/react-select';
import React, { ComponentProps, ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import styles from './Select.module.scss';
import ArrowIosDownOutline from '@/assets/icons/components/ArrowIosDownOutline';
import { Option } from '@/shared/ui/select/types';
import { SelectItem } from '@/shared/ui/select/SelectItem';

type Props = {
  children?: ReactNode;
  options: Option[];
  disabled: boolean;
  variant: 'default' | 'text' | 'icon';
  // size: 'small' | 'medium';
  width: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<typeof PrimitiveSelect.Root>;

export const Select = ({
  options,
  disabled,
  value,
  onValueChange,
  width = '210px',
  variant = 'default',
  ...props
}: Props) => {
  const option = options.find((o) => String(o.value) === value) ?? options[0];
  const OptionIcon = option.icon;

  return (
    <PrimitiveSelect.Root {...props} value={value} onValueChange={onValueChange}>
      <PrimitiveSelect.Trigger
        className={variant !== 'icon' ? styles.trigger : styles.triggerSmall}
        disabled={disabled}
        asChild
        aria-label='Select language'
      >
        <TriggerInner
          style={{ width }}
          className={variant === 'default' ? styles.triggerInner : styles.triggerInnerSmall}
        >
          {variant !== 'text' && (
            <PrimitiveSelect.Icon className={variant === 'icon' ? styles.iconSmall : styles.icon} asChild>
              {OptionIcon && <OptionIcon />}
            </PrimitiveSelect.Icon>
          )}
          <PrimitiveSelect.Value>{variant !== 'icon' && option.value}</PrimitiveSelect.Value>
          <ArrowIosDownOutline height={variant !== 'icon' ? 24 : 16} className={styles.arrowDown} />
        </TriggerInner>
      </PrimitiveSelect.Trigger>

      <PrimitiveSelect.Portal>
        <PrimitiveSelect.Content
          className={variant === 'default' ? styles.content : styles.contentSmall}
          position={'popper'}
          side={'bottom'}
        >
          <PrimitiveSelect.Viewport>
            {options.map(({ value, label, icon: Flag }) => {
              return (
                <SelectItem
                  className={variant !== 'icon' ? styles.listItem : styles.listItemSmall}
                  key={value}
                  value={value}
                  label={label}
                  Component={Flag && <Flag />}
                >
                  {variant !== 'icon' && value}
                </SelectItem>
              );
            })}
            <PrimitiveSelect.Separator />
          </PrimitiveSelect.Viewport>
        </PrimitiveSelect.Content>
      </PrimitiveSelect.Portal>
    </PrimitiveSelect.Root>
  );
};

const TriggerInner = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={className} />
));
TriggerInner.displayName = 'TriggerInner';
