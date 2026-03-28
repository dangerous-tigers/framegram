import type { ComponentType, SVGProps } from 'react';

import { Chrome, Firefox, MicrosoftEdge, Safari, Yandex } from '@/assets/icons';
import { TypeDeviceIconKey } from '@/features/profile/settings/devices/model/lib/getDeviceIconKey';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const deviceIconMap: Record<TypeDeviceIconKey, SvgIcon> = {
  chrome: Chrome,
  safari: Safari,
  firefox: Firefox,
  'microsoft edge': MicrosoftEdge,
  windows: Chrome,
  mac: Chrome,
  yandex: Yandex,
  unknown: Chrome,
};
