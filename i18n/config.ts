import { FlagUnitedKingdom, FlagRussia, Chinaflag, Belarusflag, Indianflag, Ukraineflag } from '@/assets/icons';
import { Option } from '@/shared/ui/select/Select';

export type Locale = (typeof locales)[number];

export const localeOptions: Option[] = [
  {
    label: 'be',
    value: 'Belarusian',
    icon: Belarusflag,
  },
  {
    label: 'en',
    value: 'English',
    icon: FlagUnitedKingdom,
  },
  {
    label: 'hi',
    value: 'Hindi',
    icon: Indianflag,
  },
  {
    label: 'ru',
    value: 'Russia',
    icon: FlagRussia,
  },
  {
    label: 'uk',
    value: 'Ukrainian',
    icon: Ukraineflag,
  },
  {
    label: 'zh',
    value: '中文',
    icon: Chinaflag,
  },
] as const;

export const locales = localeOptions.map((opt) => opt.label);

export const defaultLocale: Locale = 'zh';
