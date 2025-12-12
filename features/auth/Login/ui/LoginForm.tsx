'use client';
import Link from 'next/link';
import styles from './LoginForm.module.scss';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/shared/ui/input';

import { Button } from '@/shared/ui/button/Button';
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons';
import { LoginFormData, LoginSchema } from '../model/Login.schema';
import { useLogin } from '../model/useLogin';

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useLogin();

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Sign In</h2>
        <div className={styles.socialAuth}>
          <Button
            variant='text'
            fullWidth={false}
            onClick={() => alert('click Google!')}
          >
            <GoogleSvgrepoCom1
              width={34}
              height={34}
            />
          </Button>
          <Button
            variant='text'
            fullWidth={false}
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
          onSubmit={handleSubmit((data) => mutate(data))}
          className={styles.form}
        >
          <div className={styles.formInput}>
            <Controller
              name='email'
              control={control}
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <Input
                  value={value || ''}
                  onChange={onChange}
                  onBlur={onBlur}
                  label='Email'
                  type='text'
                  placeholder='Epam@epam.com'
                  id='email-field'
                  error={error?.message}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <Input
                  value={value || ''}
                  onChange={onChange}
                  onBlur={onBlur}
                  label='Password'
                  type='password'
                  id='password-field'
                  error={error?.message}
                />
              )}
            />
          </div>
          <div className={styles.forgot}>
            <Link href='/forgot-password'>Forgot Password</Link>
          </div>

          <Button
            type='submit'
            variant='primary'
            fullWidth={true}
            disabled={isPending}
          >
            {'Sign In'}
          </Button>
        </form>

        <div className={styles.footerText}>{'Dont have an account?'}</div>

        <div className={styles.footerLink}>
          <Link href='/registration'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
