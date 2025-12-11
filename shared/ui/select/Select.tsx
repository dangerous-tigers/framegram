'use client';
import * as PrimitiveSelect from '@radix-ui/react-select';
import React, { ComponentProps, ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from 'react';
import styles from './Select.module.scss';
import ArrowIosDownOutline from '@/assets/icons/components/ArrowIosDownOutline';
import { SelectItem } from '@/shared/ui/select/SelectItem';

export type Option = {
  id?: string | number;
  value: string;
  icon?: ElementType;
  label: string;
};

type Props = {
  children?: ReactNode;
  options: Option[];
  disabled: boolean;
  variant: 'default' | 'text' | 'icon';
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
      <PrimitiveSelect.Trigger className={styles.trigger} disabled={disabled} asChild aria-label='Select language'>
        <TriggerInner
          style={{ width }}
          className={variant === 'default' ? styles.triggerInner : styles.triggerInnerSmall}
        >
          {variant !== 'text' && (
            <PrimitiveSelect.Icon className={variant === 'icon' ? styles.iconSmall : styles.icon} asChild>
              {OptionIcon && <OptionIcon />}
            </PrimitiveSelect.Icon>
          )}
          <PrimitiveSelect.Value>{(variant === 'default' || variant === 'text') && option.value}</PrimitiveSelect.Value>
          <ArrowIosDownOutline height={variant === 'default' ? 24 : 16} className={styles.arrowDown} />
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
                  className={clsx(styles.listItem, variant === 'text' && styles.listItemText)}
                  key={value}
                  value={value}
                  label={label}
                  Component={Flag && <Flag />}
                >
                  {(variant === 'default' || variant === 'text') && value}
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
