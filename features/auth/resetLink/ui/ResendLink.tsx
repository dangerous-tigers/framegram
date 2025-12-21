'use client';

import s from './ResendLink.module.scss';
import { Button } from '@/shared/ui';
import resendLinkIllustration from '@/assets/illustrations/Rafiki.svg';
import Image from 'next/image';

export const ResendLink = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.contentInner}>
          <h1 className={s.title}>Email verification link expired</h1>
          <p className={s.text}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <Button fullWidth={true}>Resend link</Button>
        </div>
        <Image
          width={473}
          height={352}
          src={resendLinkIllustration}
          alt={'Илюстрация'}
        />
      </div>
    </div>
  );
};
