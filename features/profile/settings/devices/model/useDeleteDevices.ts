import { devicesDeleteApi } from '@/features/profile/settings/devices/model/devicesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDevices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: devicesDeleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error) => {
      throw new Error('Ошибка удаления устройства' + error);
    },
  });
};
