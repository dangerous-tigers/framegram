import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons';
import { Option } from '@/shared/ui/select/types';

export const langs: Option[] = [
  { value: 'English', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { value: 'Russian', label: 'Russian flag', icon: FlagRussia },
];

export const pages: Option[] = [
  { value: '0', label: 'Nullish' },
  { value: '5', label: 'Five' },
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
];
