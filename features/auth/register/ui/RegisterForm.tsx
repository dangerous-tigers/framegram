'use client';
import s from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '../model/register.schema';
import { useRegisterMutation } from '../model/register.hooks';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button/Button';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/shared/ui';
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';

export const RegisterForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegisterMutation();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const formValues = watch();

  const formSubmit = (data: RegisterFormValues) => {
    mutate(data, {
      onSuccess: () => {
        alert('Регистрация успешна!');
        router.push('/');
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  return (
    <div className={s.registerForm}>
      <form
        onSubmit={handleSubmit(formSubmit)}
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
          <Input
            type='text'
            label='Username'
            value={formValues.userName || ''}
            onChange={(value) => setValue('userName', value)}
            error={errors.userName?.message}
            placeholder='Введите имя пользователя'
            clearable
          />
          <Input
            type='email'
            label='Email'
            value={formValues.email || ''}
            onChange={(value) => setValue('email', value)}
            error={errors.email?.message}
            placeholder='Введите email'
            clearable
          />
          <Input
            type='password'
            label='Password'
            value={formValues.password || ''}
            onChange={(value) => setValue('password', value)}
            error={errors.password?.message}
            placeholder='Введите пароль'
            clearable
          />
          <Input
            type='password'
            label='Password confirmation'
            value={formValues.password || ''}
            onChange={(value) => setValue('password', value)}
            error={errors.password?.message}
            placeholder='Подтвердите пароль'
            clearable
          />
        </div>
        <div className={s.checkbox}>
          <Checkbox label='I  agree to the' />
          <span>Terms of Service and Privacy Policy</span>
        </div>
        <Button
          className={s.btn}
          fullWidth={false}
          type={'submit'}
        >
          {isPending ? 'Загрузка...' : 'Sign Up'}
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
