import { Belarusflag, Chinaflag, FlagRussia, FlagUnitedKingdom, Indianflag, Ukraineflag } from '@/assets/icons';
import { Option } from '@/shared/ui/select/Select';

export type Locale = (typeof locales)[number];

export const localeOptions: Option[] = [
  {
    label: 'be',
    value: 'Беларуская',
    icon: Belarusflag,
  },
  {
    label: 'en',
    value: 'English',
    icon: FlagUnitedKingdom,
  },
  {
    label: 'hi',
    value: 'हिन्दी',
    icon: Indianflag,
  },
  {
    label: 'ru',
    value: 'Русский',
    icon: FlagRussia,
  },
  {
    label: 'uk',
    value: 'Українська',
    icon: Ukraineflag,
  },
  {
    label: 'zh',
    value: '中文',
    icon: Chinaflag,
  },
] as const;

export const locales = localeOptions.map((opt) => opt.label);

export const defaultLocale: Locale = 'en';
