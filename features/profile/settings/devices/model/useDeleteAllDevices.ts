import { devicesDeleteAllApi } from '@/features/profile/settings/devices/model/devicesApi';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAllDevices = () => {
  const queryClient = useQueryClient();

  const { show } = useAlertStore();

  return useMutation({
    mutationFn: devicesDeleteAllApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error) => {
      show({
        error: error.message ? error.message : 'error message device',
        description: null,
        variant: 'default',
        severity: 'error',
      });
    },
  });
};
