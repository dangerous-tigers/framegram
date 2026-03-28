import { deviceIconMap } from '@/features/profile/settings/devices/model/lib/deviceIconMap';
import { getDeviceIconKey } from '@/features/profile/settings/devices/model/lib/getDeviceIconKey';

type Props = {
  value: string;
  size?: number;
  className?: string;
};

export const DeviceIcon = ({ value, size = 24, className }: Props) => {
  const key = getDeviceIconKey(value);
  const Icon = deviceIconMap[key];

  return (
    <Icon
      width={size}
      height={size}
      className={className}
    />
  );
};
