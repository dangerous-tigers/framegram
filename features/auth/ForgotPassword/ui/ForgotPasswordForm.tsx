'use client';

import s from './ForgotPasswordForm.module.scss';
import { Input } from '@/shared/ui/input';
import { ForgotPasswordData, forgotPasswordSchema } from '@/features/auth/ForgotPassword/model/ForgotPassword.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/button/Button';

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(() => {});

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>Forgot Password</h2>
        <form onSubmit={onSubmit}>
          <Input
            label={'Email'}
            type='email'
            placeholder={'Epam@epam.com'}
            {...form.register('email')}
            error={form.formState.errors.email?.message}
          />
          <p className={s.text}>Enter your email and we will send you further instruction</p>
          <div className={s.buttons}>
            <Button
              fullWidth={true}
              disabled={!form.formState.isValid}
              type={'submit'}
              className={s.btn}
            >
              Send Link
            </Button>
            <Button
              fullWidth={true}
              className={s.btn}
              variant={'text'}
            >
              Back to Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
