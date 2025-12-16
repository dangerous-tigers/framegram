'use client';

import s from './ForgotPasswordForm.module.scss';
import { Input } from '@/shared/ui/input';
import { ForgotPasswordData, forgotPasswordSchema } from '@/features/auth/ForgotPassword/model/ForgotPassword.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/button/Button';
import { Recaptcha } from '@/shared/ui';
import { useForgotPassword } from '@/features/auth/ForgotPassword/model/UseForgotPassword';

export const ForgotPasswordForm = () => {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    setValue,
    trigger,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data: ForgotPasswordData) => {
    mutate(
      {
        email: data.email,
        recaptcha: data.recaptcha,
        baseUrl: window.location.origin,
      },
      {
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  });

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>Forgot Password</h2>
        <form onSubmit={onSubmit}>
          <Input
            label={'Email'}
            type='email'
            placeholder={'Epam@epam.com'}
            {...register('email')}
            error={errors.email?.message}
          />
          <p className={s.text}>Enter your email and we will send you further instruction</p>
          <div className={s.buttons}>
            <Button
              fullWidth={true}
              disabled={!isValid || isPending}
              type={'submit'}
              className={s.btn}
            >
              Send Link
            </Button>
            <Button
              fullWidth={true}
              className={s.btn}
              variant={'text'}
              disabled={isPending}
            >
              Back to Sign In
            </Button>
            <Recaptcha
              register={register}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
