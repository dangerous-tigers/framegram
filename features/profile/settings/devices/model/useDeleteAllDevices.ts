import { devicesDeleteAllApi } from '@/features/profile/settings/devices/model/devicesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAllDevices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: devicesDeleteAllApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error) => {
      throw new Error('Ошибка удаления устройства' + error);
    },
  });
};
