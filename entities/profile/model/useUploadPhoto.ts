import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/profile/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('error');
      }

      return response.json();
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
