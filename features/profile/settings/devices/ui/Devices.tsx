import { LogOut } from '@/assets/icons';
import { useLogout } from '@/features/auth/logout/api/logout.api';
import { DeviceIcon } from '@/features/profile/settings/devices/model/lib/DeviceIcon';
import { useDeleteAllDevices } from '@/features/profile/settings/devices/model/useDeleteAllDevices';
import { useGetDevices } from '@/features/profile/settings/devices/model/useGetDevices';
import { DeviceItem } from '@/features/profile/settings/devices/ui/DeviceItem';
import { Skeleton } from '@/shared/ui';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

import s from './Devices.module.scss';

export const Devices = () => {
  const { data, isLoading, isError } = useGetDevices();

  const { mutate: deleteAllDevices } = useDeleteAllDevices();

  const { mutate: logout } = useLogout();

  if (isLoading) return <Skeleton />;

  if (isError) return <div>Ошибка загрузки платежей</div>;

  if (data?.others.length === 0) {
    return <div>Устройства отсутствуют</div>;
  }

  return (
    <div className={s.body}>
      <h4 className={s.title}>Current device</h4>
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.img}>
            {
              <DeviceIcon
                value={data?.current.browserName || 'unknown'}
                size={36}
              />
            }
          </div>
          <b className={s.device}>
            {data?.current.osName} {data?.current.browserName}
          </b>
          <p className={s.ip}>{data?.current.ip}</p>
        </div>
        <PolymorphicButton
          variant='text'
          className={s.button}
          onClick={() => logout()}
        >
          <LogOut />
          Log Out
        </PolymorphicButton>
      </div>

      <div className={s.allSessions}>
        <PolymorphicButton
          variant='outline'
          onClick={() => deleteAllDevices()}
        >
          Terminate all other session
        </PolymorphicButton>
      </div>
      <h4 className={s.title}>Active sessions</h4>

      {!data?.others.length && <div className={s.notDevices}>You have not yet logged in from other devices</div>}

      {data?.others.slice(1).map((item) => (
        <DeviceItem
          key={item.deviceId}
          data={item}
        />
      ))}
    </div>
  );
};
