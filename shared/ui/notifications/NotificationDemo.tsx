'use client';

import { useEffect } from 'react';
import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';
import { NotificationsView } from '@/shared/ui/notifications/types';
import { useTimeAgo } from '@/shared/lib/hooks/useTimeAgo';

const NotificationDemo = () => {
  const { connect, disconnect, isConnected, notifications, unreadCount, addNotification } = useNotificationWSStore();

  useEffect(() => {
    // Подключаемся к вебсокету с фиктивным токеном для демонстрации
    const fakeToken = 'demo_token';
    connect(fakeToken);

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const mockNotifications: NotificationsView[] = [
    {
      id: 1,
      message: 'Ваша подписка активирована и действует до 03.02.2025',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      message: 'Следующий платеж у вас спишется через 1 день',
      isRead: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // вчера
    },
    {
      id: 3,
      message: 'Ваша подписка истекает через 7 дней',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 дня назад
    },
    {
      id: 4,
      message: 'Ваша подписка истекает через 1 день',
      isRead: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 дня назад
    }
  ];

  const handleAddMockNotifications = () => {
    mockNotifications.forEach(notification => {
      addNotification(notification);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Демонстрация системы уведомлений</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Статус подключения: {isConnected ? 'Подключен' : 'Отключен'}</p>
        <p>Количество непрочитанных: {unreadCount}</p>
        <p>Всего уведомлений: {notifications.length}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleAddMockNotifications}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007AFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Добавить тестовые уведомления
        </button>
        
        {/* Убираем кнопку с console.log, так как она нарушает правила ESLint */}
      </div>

      <div>
        <h3>Список уведомлений:</h3>
        {notifications.length === 0 ? (
          <p>Нет уведомлений</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map(notification => {
              const timeAgo = useTimeAgo(notification.createdAt);
              return (
                <li
                  key={notification.id}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: notification.isRead ? '#f9f9f9' : '#f0f8ff'
                  }}
                >
                  <strong>ID:</strong> {notification.id} |
                  <strong> Сообщение:</strong> {notification.message} |
                  <strong> Прочитано:</strong> {notification.isRead ? 'Да' : 'Нет'} |
                  <strong> Дата:</strong> {timeAgo}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationDemo;