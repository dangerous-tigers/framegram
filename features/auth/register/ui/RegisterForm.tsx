'use client';
import s from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterFormValues, registerSchema } from '../model/register.schema';
import { useRegisterMutation } from '../model/register.hooks';
import { Button } from '@/shared/ui/button/Button';
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';
import { RegisterRequestDto } from '@/features/auth/register/model/register.types';
import { FieldInput } from '@/shared/ui/fieldInput/FieldInput';
import { FieldCheckbox } from '@/shared/ui/fieldCheckbox/FieldCheckbox';
import Link from 'next/link';
import { routes } from '@/shared/config/routes';
import { Modal, ModalHeaderWithClose } from '@/shared/ui';
import { useState } from 'react';

export const RegisterForm = () => {
  const { mutate, isPending } = useRegisterMutation();
  const { handleSubmit, control, formState } = useForm<RegisterFormValues>({
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

  const [onOpenModal, setOnOpenModal] = useState(true);
  const [successEmail, setSuccessEmail] = useState('');

  const onSubmit = (data: RegisterFormValues) => {
    const payload: RegisterRequestDto = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      baseUrl: 'http://localhost:3000',
    };
    mutate(payload, {
      onSuccess: () => {
        setSuccessEmail(data.email);
        setOnOpenModal(true);
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  return (
    <div className={s.registerForm}>
      <div className={s.registerForm__body}>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={s.form}
        >
          <div className={s.inputs}>
            <FieldInput
              name='userName'
              control={control}
              label='Username'
              placeholder='Введите имя пользователя'
              clearable
            />

            <FieldInput
              name='email'
              control={control}
              type='email'
              label='Email'
              placeholder='Введите email'
              clearable
            />

            <FieldInput
              name='password'
              control={control}
              type='password'
              label='Password'
              placeholder='Введите пароль'
            />

            <FieldInput
              name='passwordConfirm'
              control={control}
              type='password'
              label='Password confirmation'
              placeholder='Подтвердите пароль'
            />
          </div>
          <div className={s.checkbox}>
            <FieldCheckbox
              name={'terms'}
              control={control}
              label={''}
            />
            <span>
              I agree to the{' '}
              <Link
                className={s.linkCheckbox}
                href={routes.legal.terms}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href={routes.legal.policy}
                className={s.linkCheckbox}
              >
                Privacy Policy
              </Link>
            </span>
          </div>
          {formState.errors.terms && <p className={s.errorText}>{formState.errors.terms.message}</p>}

          <Button
            className={s.btn}
            fullWidth={false}
            type={'submit'}
            disabled={!formState.isValid}
          >
            {isPending ? 'Loading...' : 'Sign Up'}
          </Button>
          <span className={s.desc}>{'Do you have an account?'}</span>
          <Link
            href={routes.auth.login}
            className={s.link}
          >
            {'Sign In'}
          </Link>
        </form>
      </div>
      <Modal
        open={onOpenModal}
        onOpenChange={setOnOpenModal}
        size='sm'
        header={
          <ModalHeaderWithClose
            title='Email confirmation'
            onClose={() => setOnOpenModal(false)}
          />
        }
      >
        <div className={s.modal}>
          <div>We have sent a link to confirm your email {successEmail}</div>

          <Button
            className={s.btnModal}
            fullWidth={false}
            onClick={() => setOnOpenModal(false)}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};
