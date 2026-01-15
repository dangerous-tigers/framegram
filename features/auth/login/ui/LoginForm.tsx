'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { LoginFormData, LoginSchema } from '../model/Login.schema';
import { useLogin } from '../model/useLogin';

import styles from './LoginForm.module.scss';

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';
import { handleGoogleOAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input';

export function LoginForm() {
  const t = useTranslations('login');

  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: LoginFormData) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <>
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.socialAuth}>
            <Button
              variant='text'
              fullWidth={false}
              className={styles.iconButton}
              onClick={handleGoogleOAuth}
            >
              <GoogleSvgrepoCom1
                width={34}
                height={34}
              />
            </Button>
            <Button
              variant='text'
              fullWidth={false}
              className={styles.iconButton}
              onClick={() => alert('click GH!')}
            >
              <GithubSvgrepoCom31
                style={{ color: 'white' }}
                width={34}
                height={34}
              />
            </Button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.formInput}>
              <Input
                label={t('email')}
                type='text'
                placeholder={t('emailPlaceholder')}
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label={t('password')}
                type='password'
                placeholder={t('passwordPlaceholder')}
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <div className={styles.forgot}>
              <Link href='/forgot-password'>{t('forgotPassword')}</Link>
            </div>

            <Button
              type='submit'
              variant='primary'
              fullWidth
              disabled={isPending}
            >
              {t('signIn')}
            </Button>
          </form>

          <div className={styles.footerText}>{t('noAccount')}</div>

          <div className={styles.footerLink}>
            <Link href='/registration'>{t('signUp')}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
