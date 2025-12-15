'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConfirmEmail } from '../model/useConfirmEmail';
import { routes } from '@/shared/config/routes';
import s from './confirmEmail.module.scss';
import emailConfirmedIllustration from '@/assets/illustrations/confirm-email.svg';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  code: string;
};

export const ConfirmEmail = ({ code }: Props) => {
  const router = useRouter();
  const { mutate, isSuccess, isPending, isError, error } = useConfirmEmail();

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
          <h1 className={s.title}>Congratulations!</h1>
          <p className={s.text}>Your email has been confirmed</p>

          <Link
            className={s.link}
            href={routes.auth.login}
          >
            Sign In
          </Link>
          <button onClick={() => router.replace(routes.auth.login)}>Sign In</button>
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
