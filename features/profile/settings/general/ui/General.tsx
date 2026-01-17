'use client';

import s from './General.module.scss';

import { Input } from '@/shared/ui/input';
import { InputFile } from '@/shared/ui/inputFile';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';
import { type Option, Select } from '@/shared/ui/select/Select';
import { Textarea } from '@/shared/ui/textarea';

const CITY: Option[] = [
  { value: 'Minsk', label: 'Minsk' },
  { value: 'Kiev', label: 'Kiev' },
];
const COUNTRY: Option[] = [
  { value: 'USA', label: 'USA' },
  { value: 'Belarus', label: 'Belarus' },
];

export const General = () => {
  return (
    <div className={s.container}>
      <div className={s.download}>
        <InputFile
          className={s.profileImage}
          onSelect={() => alert('photo')}
        />
        <PolymorphicButton variant='outline'>Select photo</PolymorphicButton>
      </div>
      <div className={s.information}>
        <Input label={'User Name'} />
        <div>
          <span className={s.required}>*</span>
          <Input label={'First Name'} />
        </div>
        <div>
          <span className={s.required}>*</span>
          <Input label={'Last Name'} />
        </div>
        <form
          action=''
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label
            className={s.label}
            htmlFor='date'
          >
            Date of birthday
          </label>
          <input
            type='date'
            style={{ color: 'var(--light-100)' }}
          />
        </form>
        <div className={s.location}>
          <div>
            <span className={s.label}>Select your country</span>
            <Select
              width={'358px'}
              options={COUNTRY}
              variant='default'
              disabled={false}
              placeholder='Country'
            />
          </div>
          <div>
            <span className={s.label}>Select your city</span>
            <Select
              width={'358px'}
              options={CITY}
              variant='default'
              disabled={false}
              placeholder='City'
            />
          </div>
        </div>
        <Textarea label='About me' />
      </div>
    </div>
  );
};
