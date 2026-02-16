import { LogOut } from '@/assets/icons';
import { DeviceIcon } from '@/features/profile/settings/devices/model/lib/DeviceIcon';
import { DeviceSession } from '@/features/profile/settings/devices/model/TypeDevices';
import { useDeleteDevices } from '@/features/profile/settings/devices/model/useDeleteDevices';
import { formatDate } from '@/shared/lib/formatDate';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

import s from '@/features/profile/settings/devices/ui/Devices.module.scss';

export interface TypeDevice {
  data: DeviceSession;
}

export const DeviceItem = ({ data }: TypeDevice) => {
  const { mutate: deleteDevice } = useDeleteDevices();

  return (
    <div className={s.item}>
      <div className={s.content}>
        <div className={s.img}>
          {
            <DeviceIcon
              value={data.browserName || 'unknown'}
              size={36}
            />
          }
        </div>
        <div className={s.rows}>
          <b className={s.device}>{data.osName}</b>
          <p className={s.ip}>IP: {data.ip}</p>
          <p className={s.ip}>Last visit: {formatDate(data.lastActive)}</p>
        </div>
      </div>
      <PolymorphicButton
        variant='text'
        className={s.button}
        onClick={() => deleteDevice(data.deviceId)}
      >
        <LogOut />
        Log Out
      </PolymorphicButton>
    </div>
  );
};
