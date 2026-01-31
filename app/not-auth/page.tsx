'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Catpreloader } from '@/assets/icons';
import { routes } from '@/shared/config/routes';
import { Card } from '@/shared/ui/card';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button/PolymorphicButton';

import s from '../error-not-found.module.scss';

export default function NotAuthPage() {
  const t = useTranslations('notAuth');

  return (
    <div className={s.root}>
      <Card className={s.card}>
        <Catpreloader className={s.icon} />
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <div className={s.actions}>
          <PolymorphicButton
            as={Link}
            href={routes.auth.login}
          >
            {t('login')}
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
