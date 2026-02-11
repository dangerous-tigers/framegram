'use client';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { useIntersection } from '@/shared/lib/hooks';
import { getToken } from '@/shared/ui/notifications/getToken';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import { NotificationsResponse, SelectData } from '@/shared/ui/notifications/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Notification } from './Notification';

import s from './Notifications.module.scss';

type Props = {
  className?: string;
};

export const Notifications = ({ className }: Props) => {
  const { data } = useMe();

  const token = getToken();

  const { data: notifications, fetchNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    enabled: Boolean(data),
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/notifications/${pageParam}?pageSize=${12}&sortBy=id`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Notifications response is empty');
        }
      }
      return await response.json();
    },
    getNextPageParam: (lastPage: NotificationsResponse) => {
      const nextCursor = lastPage.items?.at(-1)?.id;
      return nextCursor;
    },
    select: (data: SelectData) => {
      return {
        items: data.pages.flatMap((page) => page.items),
        totalCount: data.pages[0].totalCount,
        notReadCount: data.pages[0].notReadCount,
      };
    },
  });

  const nextPortionRef = useIntersection(() => fetchNextPage());

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={clsx(s.trigger, className)}
        asChild
      >
        <div>
          <OutlineBell />
          {notifications && notifications.notReadCount! > 0 && <span>{notifications?.notReadCount}</span>}
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
            {notifications?.items.map((notification) => (
              <Notification
                notification={notification}
                key={notification.id}
              />
            ))}
            {/* {!isFetchingNextPage && notifications?.items.length === notifications?.totalCount && (
              <DropdownMenu.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Уведомлений 
              </DropdownMenu.Item>
            )} */}
            <div ref={nextPortionRef}></div>
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
