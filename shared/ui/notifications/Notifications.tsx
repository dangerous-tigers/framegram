'use client';

import { useEffect, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import clsx from 'clsx';

import { CloseOutline, OutlineBell } from '@/assets/icons';
import { client } from '@/shared/api/client';
import { useAuth } from '@/shared/lib/hooks/useAuth';
import { useNotifications } from '@/shared/lib/hooks/useNotifications';
import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notifications.module.scss';

type Props = {
  className?: string;
};

type NotificationItemProps = {
  notification: {
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
  };
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const format = useFormatter();
  const t = useTranslations('notifications');

  // Форматирование относительного времени через next-intl
  const timeAgoValue = format.relativeTime(new Date(notification.createdAt), new Date());

  return (
    <div className={s.itemWrapper}>
      <DropdownMenu.Item
        className={`${s.item} ${!notification.isRead ? s.unread : ''}`}
        onClick={() => onMarkAsRead(notification.id)}
      >
        {!notification.isRead && <span className={s.rightSlot}>{t('new')}</span>}
        <p className={s.notification}>{notification.message}</p>
        <span className={s.timeAgo}>{timeAgoValue}</span>
        <DropdownMenu.Separator className={s.separator} />
      </DropdownMenu.Item>
      <button
        className={s.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification.id);
        }}
        aria-label={t('deleteNotification')}
      >
        <CloseOutline
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export const Notifications = ({ className }: Props) => {
  const { isAuth } = useAuth();
  const t = useTranslations('notifications');
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastCursor, setLastCursor] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!isAuth || !isInitialLoad) return;

      try {
        setIsLoading(true);

        const response = await client.GET('/notifications/{cursor}', {
          params: {
            path: { cursor: 0 },
            query: {
              pageSize: 20,
              isRead: undefined,
              sortDirection: 'desc' as const,
              sortBy: 'notifyAt',
            },
          },
        });

        if (response.data) {
          const { items, totalCount } = response.data;

          items?.forEach((notification) => {
            useNotificationWSStore.getState().addNotification({
              id: notification.id,
              message: notification.message,
              isRead: notification.isRead,
              createdAt: notification.createdAt,
            });
          });

          if (items && items.length > 0) {
            setLastCursor(items[items.length - 1].id);
          }

          setHasMore((items?.length ?? 0) < totalCount);
          setIsInitialLoad(false);
        }
      } catch {
        // console.error('Error loading notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [isAuth, isInitialLoad]);

  const loadMoreNotifications = async () => {
    if (!hasMore || !lastCursor || isLoading) return;

    try {
      setIsLoading(true);
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: { cursor: lastCursor },
          query: {
            pageSize: 20,
            isRead: undefined,
            sortDirection: 'desc' as const,
            sortBy: 'notifyAt',
          },
        },
      });

      if (response.data) {
        const { items, totalCount } = response.data;

        items?.forEach((notification) => {
          useNotificationWSStore.getState().addNotification({
            id: notification.id,
            message: notification.message,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
          });
        });

        if (items && items.length > 0) {
          setLastCursor(items[items.length - 1].id);
        }

        setHasMore((items?.length ?? 0) < totalCount && (items?.length ?? 0) > 0);
      }
    } catch {
      // console.error('Error loading more notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = (id: number) => {
    markAsRead([id]);
  };

  const handleDeleteNotification = (id: number) => {
    deleteNotification(id);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={clsx(s.trigger, className)}
        asChild
      >
        <div>
          <OutlineBell />
          {unreadCount > 0 && <span>{unreadCount}</span>}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          arrowPadding={10}
          className={s.content}
          sideOffset={5}
        >
          <Scroll onBottomReached={loadMoreNotifications}>
            <div className={s.header}>
              <span className={s.title}>{t('title')}</span>
              {notifications.some((n) => !n.isRead) && (
                <button
                  className={s.markAllAsRead}
                  onClick={markAllAsRead}
                >
                  {t('markAllAsRead')}
                </button>
              )}
            </div>
            <DropdownMenu.Separator className={s.separator} />

            {notifications.length === 0 && !isLoading && <div className={s.emptyState}>{t('empty')}</div>}

            {isLoading && notifications.length === 0 && <div className={s.loadingState}>{t('loading')}</div>}

            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />
            ))}

            {isLoading && notifications.length > 0 && <div className={s.loadingMore}>{t('loadingMore')}</div>}
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
