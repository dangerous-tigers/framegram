'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import s from './General.module.scss';

import { UpdateProfileUser } from '@/entities/profile';
import { profileApi } from '@/entities/profile/api/profile.api';
import { generalSettingsSchema } from '@/features/profile/settings/model/generalSettingsSchema';
import { client } from '@/shared/api/client';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { Input } from '@/shared/ui/input';
import { InputFile } from '@/shared/ui/inputFile';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';
import { type Option, Select } from '@/shared/ui/select/Select';
import { Separator } from '@/shared/ui/separator/Separator';
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
  const {
    isPending,
    data: general,
    isSuccess,
  } = useQuery({
    queryKey: ['general'],
    queryFn: () => profileApi.getProfile(),
  });

  const { show } = useAlertStore();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileUser>({
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      region: '',
      dateOfBirth: '',
      aboutMe: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(generalSettingsSchema),
  });

  const disabled =
    errors.userName?.message ||
    errors.firstName?.message ||
    errors.lastName?.message ||
    errors.aboutMe?.message ||
    errors.dateOfBirth?.message;

  useEffect(() => {
    setValue('firstName', general?.firstName ?? '');
    setValue('lastName', general?.lastName ?? '');
    setValue('userName', general?.userName ?? '');
    setValue('aboutMe', general?.aboutMe ?? '');
    setValue('country', general?.country ?? '');
    setValue('city', general?.city ?? '');
  }, [isSuccess]);

  if (isPending) return <CatPreloader />;

  const onSubmit: SubmitHandler<UpdateProfileUser> = (data) => {
    client
      .PUT('/users/profile', {
        body: {
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          city: data.city,
          country: data.country,
          region: data.region,
          dateOfBirth: data.dateOfBirth,
          aboutMe: data.aboutMe,
        },
      })
      .then(() =>
        show({
          error: null,
          description: 'Your settings are saved!',
          variant: 'default',
          severity: 'success',
        }),
      )
      .catch(() => {
        show({
          error: null,
          description: 'Error! Server is not available!',
          variant: 'default',
          severity: 'error',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.container}>
        <div className={s.download}>
          <InputFile
            className={s.profileImage}
            onSelect={() => alert('photo')}
          />
          <PolymorphicButton variant='outline'>Select photo</PolymorphicButton>
        </div>
        <div className={s.information}>
          <span className={s.required}>*</span>
          <Input
            error={errors.userName?.message}
            label={'User Name'}
            {...register('userName')}
          />
          <div>
            <span className={s.required}>*</span>
            <Input
              error={errors.firstName?.message}
              label={'First Name'}
              {...register('firstName', { required: true })}
            />
          </div>
          <div>
            <span className={s.required}>*</span>
            <Input
              error={errors.lastName?.message}
              label={'Last Name'}
              {...register('lastName', { required: true })}
            />
          </div>
          <div className={s.birthday}>
            <label
              className={s.label}
              htmlFor='date'
            >
              Date of birthday
            </label>
            <input
              type='date'
              {...register('dateOfBirth')}
              style={{ color: 'var(--light-100)' }}
            />
          </div>
          <div className={s.location}>
            <div>
              <span className={s.label}>Select your country</span>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    width={'358px'}
                    options={COUNTRY}
                    variant='default'
                    disabled={false}
                    placeholder={'Country'}
                  />
                )}
              />
            </div>
            <div>
              <span className={s.label}>Select your city</span>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    width={'358px'}
                    options={CITY}
                    variant='default'
                    disabled={false}
                    placeholder={'City'}
                  />
                )}
              />
            </div>
          </div>
          <Textarea
            error={errors.aboutMe?.message}
            label='About me'
            {...register('aboutMe')}
          />
        </div>
      </div>
      <Separator className={s.separator} />
      <div className={s.buttons}>
        <PolymorphicButton
          type='submit'
          disabled={disabled}
        >
          Save
        </PolymorphicButton>
      </div>
    </form>
  );
};
