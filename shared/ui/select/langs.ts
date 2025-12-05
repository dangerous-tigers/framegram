import { ElementType } from 'react';
import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons';

export type SelectOption = {
  country: string;
  icon: ElementType;
  label: string;
};

export const langs: SelectOption[] = [
  { country: '123', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { country: 'sadfagsgdfgdfgfdhgfghssss', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { country: 'sad', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { country: 's', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { country: 'English', label: 'United Kingdom flag', icon: FlagUnitedKingdom },
  { country: 'Russian', label: 'Russian flag', icon: FlagRussia },
];
