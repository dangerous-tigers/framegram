import { useEffect } from 'react';

import { notificationWebSocketService } from '@/shared/lib/websocket/notification-websocket.service';

/**
 * Хук для отслеживания статуса сети и автоматического переподключения WebSocket
 */
export const useNetworkStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      // При подключении к интернету пытаемся восстановить соединение
      const token = localStorage.getItem('accessToken');
      if (token) {
        notificationWebSocketService.connect(token);
      }
    };

    const handleOffline = () => {
      // При отключении от интернета закрываем соединение
      notificationWebSocketService.disconnect();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};
