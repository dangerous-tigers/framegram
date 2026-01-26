'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type RegisterFormValues, registerSchema } from '../model/register.schema';
import { useRegisterMutation } from '../model/useRegister';

import s from './RegisterForm.module.scss';

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';
import { RegisterRequestDto } from '@/features/auth/register/model/register.types';
import { routes } from '@/shared/config/routes';
import { Modal, ModalHeaderWithClose } from '@/shared/ui';
import { Button } from '@/shared/ui/button/Button';
import { PolymorphicButton } from '@/shared/ui/buttonComponent';
import { FieldCheckbox } from '@/shared/ui/fieldCheckbox/FieldCheckbox';
import { FieldInput } from '@/shared/ui/fieldInput/FieldInput';

export const RegisterForm = () => {
  const t = useTranslations('register');
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

  const [onOpenModal, setOnOpenModal] = useState(false);
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
          <PolymorphicButton variant={'text'}>
            <GoogleSvgrepoCom1
              width={36}
              height={36}
            />
          </PolymorphicButton>
          <PolymorphicButton variant={'text'}>
            <GithubSvgrepoCom31
              width={36}
              height={36}
              color={'var(--light-100)'}
            />
          </PolymorphicButton>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={s.form}
        >
          <div className={s.inputs}>
            <FieldInput
              name='userName'
              control={control}
              label={t('name')}
              placeholder={t('placeholder name')}
            />

            <FieldInput
              name='email'
              control={control}
              type='email'
              label={t('email')}
              placeholder={t('placeholder email')}
            />

            <FieldInput
              name='password'
              control={control}
              type='password'
              label={t('password')}
              placeholder={t('placeholder password')}
            />

            <FieldInput
              name='passwordConfirm'
              control={control}
              type='password'
              label={t('passwordConfirm')}
              placeholder={t('placeholder passwordConfirm')}
            />
          </div>
          <div className={s.checkbox}>
            <FieldCheckbox
              name={'terms'}
              control={control}
              label={''}
            />
            <span>
              {t('I agree to the')}{' '}
              <Link
                className={s.linkCheckbox}
                href={routes.legal.terms}
              >
                {t('Terms of Service')}
              </Link>{' '}
              {t('and')}{' '}
              <Link
                href={routes.legal.policy}
                className={s.linkCheckbox}
              >
                {t('Privacy Policy')}
              </Link>
            </span>
          </div>
          {formState.errors.terms && <p className={s.errorText}>{formState.errors.terms.message}</p>}

          <PolymorphicButton
            className={s.btn}
            fullWidth={false}
            type={'submit'}
            disabled={isPending}
          >
            {isPending ? t('Loading') : t('signUp')}
          </PolymorphicButton>
          <span className={s.desc}>{t('Do you have an account?')}</span>
          <PolymorphicButton
            as={Link}
            href={routes.auth.login}
            className={s.link}
            variant={'text'}
          >
            {t('signIn')}
          </PolymorphicButton>
        </form>
      </div>
      <Modal
        open={onOpenModal}
        onOpenChange={setOnOpenModal}
        size='sm'
        header={
          <ModalHeaderWithClose
            title={t('Email confirmation')}
            onClose={() => setOnOpenModal(false)}
          />
        }
      >
        <div className={s.modal}>
          <div>
            {t('We have sent a link to confirm your email')} {successEmail}
          </div>

          <Button
            className={s.btnModal}
            fullWidth={false}
            onClick={() => setOnOpenModal(false)}
          >
            {t('Ok')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
