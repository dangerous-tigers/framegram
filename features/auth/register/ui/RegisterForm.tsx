'use client';
import s from './RegisterForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterFormValues, registerSchema } from '../model/register.schema';
import { useRegisterMutation } from '../model/register.hooks';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button/Button';
import { Checkbox } from '@/shared/ui';
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';
import { RegisterRequestDto } from '@/features/auth/register/model/register.types';

export const RegisterForm = () => {
  const { mutate, isPending } = useRegisterMutation();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const payload: RegisterRequestDto = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      baseUrl: 'http://localhost:3000',
    };
    mutate(payload, {
      onSuccess: () => {
        alert('Регистрация успешна!');
        // router.push('/');
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  return (
    <div className={s.registerForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
      >
        <h1 className={s.title}>Sign Up</h1>
        <div className={s.socials}>
          <Button
            variant={'text'}
            fullWidth={false}
          >
            <GoogleSvgrepoCom1
              width={36}
              height={36}
            />
          </Button>
          <Button
            variant={'text'}
            fullWidth={false}
          >
            <GithubSvgrepoCom31
              width={36}
              height={36}
              color={'var(--light-100)'}
            />
          </Button>
        </div>
        <div className={s.inputs}>
          <Controller
            name='userName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                label='Username'
                error={errors.userName?.message}
                placeholder='Введите имя пользователя'
                clearable
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='email'
                label='Email'
                error={errors.email?.message}
                placeholder='Введите email'
                clearable
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='password'
                label='Password'
                error={errors.password?.message}
                placeholder='Введите пароль'
              />
            )}
          />
          <Controller
            name='passwordConfirm'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='password'
                label='Password confirmation'
                error={errors.passwordConfirm?.message}
                placeholder='Подтвердите пароль'
              />
            )}
          />
          {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
        </div>
        <div className={s.checkbox}>
          <Controller
            name='terms'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                label='I agree to the'
              />
            )}
          />
          <span>Terms of Service and Privacy Policy</span>
        </div>
        {errors.terms && <span>{errors.terms.message}</span>}

        <Button
          className={s.btn}
          fullWidth={false}
          type={'submit'}
        >
          {isPending ? 'Loading...' : 'Sign Up'}
        </Button>
        <span className={s.desc}>{'Do you have an account?'}</span>
        <Button
          className={s.SignIn}
          variant={'text'}
          fullWidth={false}
        >
          {'Sign In'}
        </Button>
      </form>
    </div>
  );
};
