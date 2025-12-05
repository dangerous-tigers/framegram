'use client';
import * as SelectPrimitive from '@radix-ui/react-select';
import Image, { StaticImageData } from 'next/image';
import UnitedKingdom from '@/assets/images/flags/Flag_United_Kingdom.png';
import Russia from '@/assets/images/flags/Flag_Russia.png';
import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss';
import ArrowIosDownOutline from '@/assets/icons/components/ArrowIosDownOutline';
import ArrowIosUp from '@/assets/icons/components/ArrowIosUp';

type OptionType = {
  id: number;
  title: string;
  flag: StaticImageData;
};

const options: OptionType[] = [
  { id: 1, title: 'English', flag: UnitedKingdom },
  { id: 2, title: 'Russian', flag: Russia },
];

export const Select = () => {
  const [value, setValue] = useState<string>(String(options[0].title));
  const disabled = false;

  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, []);
  const selectedItem = options.find((o) => String(o.title) === value) ?? options[0];

  const onChangeHandler = (value: string) => {
    setValue(value);
  };

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(value) => onChangeHandler(value)}
    >
      <SelectPrimitive.Trigger
        disabled={disabled}
        ref={triggerRef}
        className={styles.trigger}
        asChild
        aria-label='Select language'
      >
        <TriggerInner>
          <Image
            width={20}
            height={20}
            src={selectedItem && selectedItem.flag}
            alt={'the flag of the country whose language is selected'}
          />
          <SelectPrimitive.Value title={selectedItem.title} />
          <ArrowIosDownOutline className={styles.arrowDown} />
          <ArrowIosUp className={styles.arrowUp} />
        </TriggerInner>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          style={{ width }}
          className={styles.content}
          side={'bottom'}
          position={'popper'}
        >
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport>
            {options.map((option) => {
              return (
                <SelectPrimitive.Item
                  className={styles.listItem}
                  value={option.title}
                  key={option.id}
                >
                  <Image
                    width={20}
                    height={20}
                    src={option.flag}
                    alt={'the flag of the country whose language is selected'}
                  />
                  <SelectPrimitive.ItemText>{option.title}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              );
            })}

            <SelectPrimitive.Separator />
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const TriggerInner = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => (
  <div
    ref={ref}
    {...props}
    className={`${styles.triggerInner} ${props.className ?? ''}`}
  />
));
TriggerInner.displayName = 'TriggerInner';
