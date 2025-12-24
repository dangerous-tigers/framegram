'use client';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import styles from './ReCaptcha.module.scss';
import clsx from 'clsx';
import { ForgotPasswordData } from '@/features/auth/ForgotPassword/model/ForgotPassword.schema';

type Props = {
  register: UseFormRegister<ForgotPasswordData>;
  setValue: UseFormSetValue<ForgotPasswordData>;
  trigger: UseFormTrigger<ForgotPasswordData>;
  errors: FieldErrors<ForgotPasswordData>;
};

export function Recaptcha({ register, setValue, trigger, errors }: Props) {
  // Используем ref, чтобы избежать проблем с пересозданием функций при ре-рендере
  const isReady = useRef(false);

  useEffect(() => {
    register('recaptcha', {
      required: 'Please verify that you are not a robot.',
    });

    // 1. Определяем глобальные коллбэки для reCAPTCHA
    // Как только капча готова, сохраняем значение
    window.onCaptchaSuccess = (token: string) => {
      setValue('recaptcha', token);
      trigger('recaptcha');
    };
    // Как только капча истекает, очищаем значение
    window.onCaptchaExpired = () => {
      setValue('recaptcha', '');
      trigger('recaptcha');
    };
    // При ошибке также очищаем значение
    window.onCaptchaError = () => {
      setValue('recaptcha', '');
      trigger('recaptcha');
    };

    // 2. Хак для повторного рендеринга при навигации в Next.js
    // Если скрипт уже загружен (например, при возврате на страницу), нужно явно отрендерить виджет
    if (window.grecaptcha && window.grecaptcha.render && !isReady.current) {
      try {
        // Ищем элемент вручную, так как авто-рендер срабатывает только при первой загрузке скрипта
        // Нужно для того, чтобы recaptcha корректно отображалась при навигации назад в Next.js без перезагрузки страницы
        window.grecaptcha.render('recaptcha-container', {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
          callback: 'onCaptchaSuccess',
          'expired-callback': 'onCaptchaExpired',
          'error-callback': 'onCaptchaError',
          theme: 'dark',
        });
        isReady.current = true;
      } catch {
        // Игнорируем ошибку
      }
    }

    // Очистка при размонтировании
    return () => {
      window.onCaptchaSuccess = () => {};
      window.onCaptchaExpired = () => {};
      window.onCaptchaError = () => {};
    };
  }, [register, setValue, trigger]);

  return (
    <div className={clsx(styles.recaptcha, errors.recaptcha && styles.recaptchaError)}>
      <Script
        src='https://www.google.com/recaptcha/api.js'
        strategy='afterInteractive'
      />

      {/* Добавили ID для явного рендеринга, если авто-рендер не сработает */}
      <div
        id='recaptcha-container'
        className={'g-recaptcha'}
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        data-theme='dark'
        data-callback='onCaptchaSuccess'
        data-expired-callback='onCaptchaExpired'
        data-error-callback='onCaptchaError'
      />

      {errors.recaptcha && <p className={styles.error}>{errors.recaptcha.message as string}</p>}
    </div>
  );
}
