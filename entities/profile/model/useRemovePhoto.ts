import { client } from '@/shared/api/client';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemovePhoto = () => {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: async () => {
      const response = await client.DELETE('/users/profile/avatar', {});
      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['general'],
      });
      show({
        error: null,
        description: 'Your settings are saved!',
        variant: 'default',
        severity: 'success',
      });
    },
  });
};
