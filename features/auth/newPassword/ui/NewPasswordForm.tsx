'use client';

import s from './NewPasswordForm.module.scss';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewPasswordData, newPasswordSchema } from '@/features/auth/newPassword/model/NewPassword.schema';
import { useNewPassword } from '@/features/auth/newPassword/model/UseNewPassword';
import { useRecoveryParams } from '@/features/auth/newPassword/model/useRecoveryParams';
import { useTranslations } from 'next-intl';

export const CreateNewPasswordForm = () => {
  const t = useTranslations('newPassword');

  const params = useRecoveryParams();
  if (!params) return null;

  const { recoveryCode } = params;
  const { mutate, isPending } = useNewPassword();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<createNewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data: createNewPasswordData) => {
    mutate({
      newPassword: data.password,
      recoveryCode,
    });
  });

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>{t('title')}</h2>
        <form onSubmit={onSubmit}>
          <div className={s.inputWrapper}>
            <Input
              label={t('newPassword')}
              type='password'
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              label={t('passwordConfirm')}
              type='password'
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message}
            />
          </div>
          <p className={s.text}>{t('text')}</p>
          <Button
            fullWidth={true}
            disabled={!isValid || isPending}
            type={'submit'}
            className={s.btn}
          >
            {isPending ? '...Loading' : t('createBtn')}
          </Button>
        </form>
      </div>
    </div>
  );
};
