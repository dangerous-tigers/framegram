/* eslint-disable no-unused-vars */
'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { CloseOutline, OutlineBell } from '@/assets/icons';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '@/shared/lib/hooks/useAuth';
import { useNotifications } from '@/shared/lib/hooks/useNotifications';
import { client } from '@/shared/api/client';

import s from './Notifications.module.scss';

type Props = {
  className?: string;
};

export const Notifications = ({ className }: Props) => {
  const { isAuthenticated } = useAuth();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationTypeInfo
  } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastCursor, setLastCursor] = useState<number | null>(null);

  // Загрузка уведомлений с сервера при первом подключении
  useEffect(() => {
    const loadNotifications = async () => {
      if (isAuthenticated && notifications.length === 0) {
        try {
          setIsLoading(true);
          
          // Получаем первые уведомления с сервера
          const response = await client.GET('/notifications/{cursor}', {
            params: {
              path: { cursor: 0 }, // Начальный курсор
              query: {
                pageSize: 20,
                isRead: undefined, // Получаем все уведомления
                sortDirection: 'desc' as const,
                sortBy: 'notifyAt'
              }
            }
          });

          if (response.data) {
            const { items, notReadCount, totalCount } = response.data;
            
            // Обновляем состояние уведомлений
            items.forEach(notification => {
              // Добавляем уведомление через store
              useNotificationWSStore.getState().addNotification({
                id: notification.id,
                message: notification.message,
                isRead: notification.isRead,
                createdAt: notification.createdAt
              });
            });
            
            // Обновляем счетчик непрочитанных
            useNotificationWSStore.setState({ unreadCount: notReadCount });
            
            // Обновляем информацию о пагинации
            if (items.length > 0) {
              setLastCursor(items[items.length - 1].id);
            }
            
            setHasMore(items.length < totalCount);
          }
        } catch (_error) {
          // console.error('Error loading notifications:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadNotifications();
  }, [isAuthenticated, notifications.length]);

  // Загрузка дополнительных уведомлений при скролле
  const loadMoreNotifications = async () => {
    if (!hasMore || !lastCursor || isLoading) return;

    try {
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: { cursor: lastCursor },
          query: {
            pageSize: 20,
            isRead: undefined,
            sortDirection: 'desc' as const,
            sortBy: 'notifyAt'
          }
        }
      });

      if (response.data) {
        const { items, totalCount } = response.data;
        
        // Добавляем новые уведомления в хранилище
        items.forEach(notification => {
          useNotificationWSStore.getState().addNotification({
            id: notification.id,
            message: notification.message,
            isRead: notification.isRead,
            createdAt: notification.createdAt
          });
        });

        if (items.length > 0) {
          setLastCursor(items[items.length - 1].id);
        }
        
        setHasMore(items.length < totalCount && items.length > 0);
      }
    } catch (_error) {
      // console.error('Error loading more notifications:', error);
    }
  };

  // Обработчик отметки уведомлений как прочитанных
  const handleMarkAsRead = (id: number) => {
    markAsRead([id]);
  };

  // Обработчик удаления уведомления
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
              <span className={s.title}>Уведомления</span>
              {notifications.some(n => !n.isRead) && (
                <button
                  className={s.markAllAsRead}
                  onClick={markAllAsRead}
                >
                  Отметить все как прочитанные
                </button>
              )}
            </div>
            <DropdownMenu.Separator className={s.separator} />
            
            {notifications.length === 0 && !isLoading && (
              <div className={s.emptyState}>Нет уведомлений</div>
            )}
            
            {isLoading && notifications.length === 0 && (
              <div className={s.loadingState}>Загрузка уведомлений...</div>
            )}

            {notifications.map((notification) => {
              const notificationType = getNotificationTypeInfo(notification.message);
              return (
                <div key={notification.id} className={`${s.itemWrapper}`}>
                  <DropdownMenu.Item
                    className={`${s.item} ${!notification.isRead ? s.unread : ''}`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    {!notification.isRead && <span className={s.rightSlot}>Новое</span>}
                    <p className={s.notification}>
                      <span className={s.icon}>{notificationType.icon}</span> {notification.message}
                    </p>
                    <span className={s.timeAgo}>
                      <CompTimeAgo date={new Date(notification.createdAt)} />
                    </span>
                    <DropdownMenu.Separator className={s.separator} />
                  </DropdownMenu.Item>
                  <button
                    className={s.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation(); // Останавливаем всплытие события, чтобы не вызвать onClick у родителя
                      handleDeleteNotification(notification.id);
                    }}
                    aria-label="Удалить уведомление"
                  >
                    <CloseOutline width={16} height={16} />
                  </button>
                </div>
              );
            })}

            {isLoading && notifications.length > 0 && (
              <div className={s.loadingMore}>Загрузка...</div>
            )}
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
