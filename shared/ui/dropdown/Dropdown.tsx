'use client';
import * as React from 'react';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { Scroll } from '@/shared/ui/dropdown/ScrollArea';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Dropdown.module.scss';

type Props = {
  notRead: number;
  className?: string;
};

export const Dropdown = ({ className, notRead = 12 }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={clsx(s.trigger, className)}
        asChild
      >
        <div>
          <OutlineBell />
          {notRead > 0 && <span>{notRead}</span>}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.content}
          sideOffset={5}
        >
          <Scroll>
            <span className={s.title}>Уведомления</span>
            <DropdownMenu.Separator className={s.separator} />
            <DropdownMenu.Item className={s.item}>
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item className={s.item}>
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>1 час назад</span>
            </DropdownMenu.Item>
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
