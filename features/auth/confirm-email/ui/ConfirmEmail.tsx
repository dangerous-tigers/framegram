'use client';

import { useEffect } from 'react';
import { useConfirmEmail } from '../model/useConfirmEmail';
import { routes } from '@/shared/config/routes';
import s from './confirmEmail.module.scss';
import emailConfirmedIllustration from '@/assets/illustrations/confirm-email.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  code: string;
};

export const ConfirmEmail = ({ code }: Props) => {
  const { mutate, isSuccess, isPending, isError, error } = useConfirmEmail();

  const t = useTranslations('confirmEmail');

  useEffect(() => {
    mutate(code);
  }, [code, mutate]);

  if (isPending) return <p>Confirming email...</p>;

  if (isError) {
    return <p>Email confirmation failed: {(error as Error).message}</p>;
  }

  if (isSuccess) {
    return (
      <div className={s.confirmEmail}>
        <div className={s.content}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.text}>{t('text')}</p>

          <Link
            replace
            className={s.link}
            href={routes.auth.login}
          >
            {t('logIn')}
          </Link>
        </div>

        <div className={s.image}>
          <Image
            width={432}
            height={300}
            src={emailConfirmedIllustration}
            alt={'Илюстрация'}
          />
        </div>
      </div>
    );
  }

  return null;
};
