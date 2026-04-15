import { SessionsResponse } from '@/features/profile/settings/devices/model/TypeDevices';
import { client } from '@/shared/api/client';

export const devicesGetApi = async (): Promise<SessionsResponse> => {
  const response = await client.GET('/sessions');

  if (response.error || !response.data) {
    throw new Error('Ошибка выполнения запроса');
  }
  return response.data;
};

export const devicesDeleteApi = async (deviceId: number) => {
  try {
    const response = await client.DELETE('/sessions/{deviceId}', {
      params: {
        path: {
          deviceId,
        },
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка выполнения запроса' + error);
  }
};

export const devicesDeleteAllApi = async () => {
  try {
    const response = await client.DELETE('/sessions/terminate-all');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка выполнения запроса' + error);
  }
};
