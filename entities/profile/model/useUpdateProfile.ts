import { UpdateProfileUser } from '@/entities/profile/types/types';
import { client } from '@/shared/api/client';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: async (data: UpdateProfileUser) => {
      const response = await client.PUT('/users/profile', {
        body: {
          ...data,
        },
      });
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
    onError: () => {
      show({
        error: 'Error! Server is not available!',
        description: null,
        variant: 'default',
        severity: 'error',
      });
    },
  });
};
