'use client';

import { MouseEventHandler, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CloseOutline, ImageOutline } from '@/assets/icons';
import { UpdateProfileUser } from '@/entities/profile';
import { useGetProfile, useRemovePhoto, useUpdateProfile, useUploadPhoto } from '@/entities/profile/model';
import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { ImageUpload } from '@/features/profile/settings/general/ui/ImageUpload';
import { generalSettingsSchema } from '@/features/profile/settings/model/generalSettingsSchema';
import { CatPreloader } from '@/shared/components/catPreloader/CatPreloader';
import { ConfirmActionModal } from '@/shared/components/confirmActionModal';
import { validateImage } from '@/shared/lib/file/validateImage';
import { Input } from '@/shared/ui/input';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';
import { Separator } from '@/shared/ui/separator/Separator';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

import s from './General.module.scss';

export const General = () => {
  const { show: showActionModal, open } = useConfirmStore();

  const tGeneral = useTranslations('profile.settings.general');
  const tAction = useTranslations('confirmActions');

  const { isPending, isSuccess, data } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const uploadPhoto = useUploadPhoto();
  const removePhoto = useRemovePhoto();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
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
    mode: 'onChange',
    resolver: zodResolver(generalSettingsSchema),
  });

  useEffect(() => {
    setValue('firstName', data?.firstName ?? '');
    setValue('lastName', data?.lastName ?? '');
    setValue('userName', data?.userName ?? '');
    setValue('aboutMe', data?.aboutMe ?? '');
    setValue('dateOfBirth', data?.dateOfBirth?.split('T')[0] ?? '');
    setValue('country', data?.country ?? '');
    setValue('city', data?.city ?? '');
  }, [isSuccess]);

  if (isPending) return <CatPreloader />;

  const onSubmit: SubmitHandler<UpdateProfileUser> = (data) => {
    updateProfile.mutate(data);
  };

  const handleUploadPhoto = (files: File[]) => {
    files.forEach(validateImage);
    const file = files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    uploadPhoto.mutate(formData);
  };

  const handleRemovePhoto: MouseEventHandler<HTMLSpanElement> = (event) => {
    showActionModal();
    event.stopPropagation();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.container}>
        <div className={s.download}>
          <ImageUpload
            className={s.profileImage}
            accept='image/png,image/jpeg'
            onSelect={handleUploadPhoto}
          >
            {!data?.avatars[0] ? (
              <span className={s.drag}>
                <ImageOutline
                  width={36}
                  height={36}
                />
              </span>
            ) : (
              <img
                src={data.avatars[0].url}
                alt='profile photo'
              />
            )}
            {data?.avatars[0] && (
              <span
                className={s.cross}
                onClick={handleRemovePhoto}
              >
                <CloseOutline
                  width={16}
                  height={16}
                />
              </span>
            )}
            <PolymorphicButton
              variant='outline'
              onClick={(e) => e.preventDefault()}
            >
              {tGeneral('selectImage')}
            </PolymorphicButton>
          </ImageUpload>
          {open && (
            <ConfirmActionModal confirmCallback={() => removePhoto.mutate()}>
              <span>{tAction('deletePhoto')}</span>
            </ConfirmActionModal>
          )}
        </div>
        <div className={s.information}>
          <span className={s.required}>*</span>
          <Input
            error={errors.userName?.message}
            label={tGeneral('userName')}
            {...register('userName')}
          />
          <div>
            <span className={s.required}>*</span>
            <Input
              error={errors.firstName?.message}
              label={tGeneral('firstName')}
              {...register('firstName', { required: true })}
            />
          </div>
          <div>
            <span className={s.required}>*</span>
            <Input
              error={errors.lastName?.message}
              label={tGeneral('lastName')}
              {...register('lastName', { required: true })}
            />
          </div>
          <div className={s.birthday}>
            <label
              className={s.label}
              htmlFor='date'
            >
              {tGeneral('birthday')}
            </label>
            <input
              type='date'
              {...register('dateOfBirth')}
              style={{ color: 'var(--light-100)' }}
            />
          </div>
          <Textarea
            error={errors.aboutMe?.message}
            label={tGeneral('aboutMe')}
            {...register('aboutMe')}
          />
        </div>
      </div>
      <Separator className={s.separator} />
      <div className={s.buttons}>
        <PolymorphicButton
          type='submit'
          disabled={!isValid || updateProfile.isPending}
        >
          {updateProfile.isPending ? tGeneral('saving') : tGeneral('save')}
        </PolymorphicButton>
      </div>
    </form>
  );
};
