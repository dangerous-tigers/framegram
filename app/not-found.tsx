'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Catpreloader } from '@/assets/icons';
import { Card } from '@/shared/ui/card';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button/PolymorphicButton';

import s from './error-not-found.module.scss';

export default function NotFound() {
  const t = useTranslations('error404');
  const router = useRouter();

  return (
    <div className={s.root}>
      <Card className={s.card}>
        <Catpreloader className={s.icon} />
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <div className={s.actions}>
          <PolymorphicButton
            variant='outline'
            onClick={() => router.back()}
          >
            {t('goBack')}
          </PolymorphicButton>

          <PolymorphicButton
            as={Link}
            href='/'
          >
            {t('backToHome')}
          </PolymorphicButton>
        </div>
      </Card>
    </div>
  );
}
