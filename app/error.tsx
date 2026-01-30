'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import s from './error-not-found.module.scss';

import { Catpreloader } from '@/assets/icons';
import { Card } from '@/shared/ui/card';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button/PolymorphicButton';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errorPage');
  const router = useRouter();

  return (
    <div className={s.root}>
      <Card className={s.card}>
        <Catpreloader className={s.icon} />
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <div className={s.actions}>
          <PolymorphicButton
            onClick={() => {
              reset();
              router.refresh();
            }}
          >
            {t('tryAgain')}
          </PolymorphicButton>
          <PolymorphicButton
            as={Link}
            href='/'
            variant='outline'
          >
            {t('backToHome')}
          </PolymorphicButton>
        </div>
      </Card>
    </div>
  );
}
