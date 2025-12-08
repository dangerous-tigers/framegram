'use client';
import { Content, Icon, Portal, Root, Separator, Trigger, Value, Viewport } from '@radix-ui/react-select';
import React, { ComponentProps, ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import styles from './Select.module.scss';
import ArrowIosDownOutline from '@/assets/icons/components/ArrowIosDownOutline';
import { Option } from '@/shared/ui/select/types';
import { SelectItem } from '@/shared/ui/select/SelectItem';

type Props = {
  children?: ReactNode;
  options: Option[];
  disabled: boolean;
  size: 'small' | 'medium';
  width: string;
  placeholder?: string;
} & ComponentPropsWithoutRef<typeof Root>;

export const Select = ({
  options,
  disabled,
  value,
  onValueChange,
  width = '210px',
  size = 'medium',
  ...props
}: Props) => {
  const option = options.find((o) => String(o.value) === value) ?? options[0];
  const OptionIcon = option.icon;

  return (
    <Root {...props} value={value} onValueChange={onValueChange}>
      <Trigger disabled={disabled} asChild aria-label='Select language'>
        <TriggerInner
          style={size === 'medium' ? { width } : { width: '42px' }}
          className={size === 'medium' ? styles.trigger : styles.triggerSmall}
        >
          <Icon className={size === 'medium' ? styles.iconSmall : styles.icon} asChild>
            <OptionIcon />
          </Icon>
          <Value>{size === 'medium' && option.value}</Value>
          <ArrowIosDownOutline height={size === 'medium' ? 24 : 16} className={styles.arrowDown} />
        </TriggerInner>
      </Trigger>

      <Portal>
        <Content
          style={size === 'medium' ? { width } : { width: '42px' }}
          className={size === 'medium' ? styles.content : styles.contentSmall}
          position={'popper'}
          side={'bottom'}
        >
          <Viewport>
            {options.map(({ value, label, icon: Flag }) => {
              return (
                <SelectItem
                  className={size === 'medium' ? styles.listItem : styles.listItemSmall}
                  sizes={'small'}
                  key={value}
                  country={value}
                  label={label}
                  Component={<Flag />}
                >
                  {size === 'medium' && value}
                </SelectItem>
              );
            })}
            <Separator />
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

const TriggerInner = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={className} />
));
TriggerInner.displayName = 'TriggerInner';
