'use client';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notifications.module.scss';

type Props = {
  notRead: number;
  className?: string;
  isRead: boolean;
  createdAt: string;
};

export const Notifications = ({
  className,
  notRead = 12,
  isRead = false,
  createdAt = '2026-02-03T15:48:49.082Z',
}: Props) => {
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
          align='end'
          arrowPadding={10}
          className={s.content}
          sideOffset={5}
        >
          <Scroll>
            <span className={s.title}>Уведомления</span>
            <DropdownMenu.Separator className={s.separator} />
            <DropdownMenu.Item className={s.item}>
              Новое уведомление! {!isRead && <span className={s.rightSlot}>Новое</span>}
              <p className={s.notification}>Ваша подписка активирована и действует до 03.02.2025</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item className={s.item}>
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Ваша подписка истекает через 7 дней</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
              <DropdownMenu.Separator className={s.separator} />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={s.item}
              disabled
            >
              Новое уведомление! <span className={s.rightSlot}>Новое</span>
              <p className={s.notification}>Следующий платеж у вас спишется через 1 день</p>
              <span className={s.timeAgo}>
                <CompTimeAgo date={new Date(createdAt)} />
              </span>
            </DropdownMenu.Item>
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
