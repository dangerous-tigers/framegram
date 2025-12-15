'use client';

import s from '@/features/auth/ForgotPassword/ui/ForgotPasswordForm.module.scss';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createNewPasswordData,
  createNewPasswordSchema,
} from '@/features/auth/createNewPassword/model/CreateNewPassword.schema';

export const CreateNewPasswordForm = () => {
  const form = useForm<createNewPasswordData>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(() => {});

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>Create New Password</h2>
        <form onSubmit={onSubmit}>
          <Input
            label={'New Password'}
            type='password'
            {...form.register('password')}
            error={form.formState.errors.password?.message}
          />
          <Input
            label={'Password confirmation'}
            type='password'
            {...form.register('passwordConfirm')}
            error={form.formState.errors.passwordConfirm?.message}
          />
          <p className={s.text}>Your password must be between 6 and 20 characters</p>
          <div className={s.buttons}>
            <Button
              fullWidth={true}
              disabled={!form.formState.isValid}
              type={'submit'}
              className={s.btn}
            >
              Send Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
