import { devicesGetApi } from '@/features/profile/settings/devices/model/devicesApi';
import { useQuery } from '@tanstack/react-query';

export const useGetDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: devicesGetApi,
  });
};
