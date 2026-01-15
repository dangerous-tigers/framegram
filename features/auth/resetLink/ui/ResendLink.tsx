'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import s from './ResendLink.module.scss';

import resendLinkIllustration from '@/assets/illustrations/Rafiki.svg';
import { UseResendLink } from '@/features/auth/resetLink/model/ResendLink';
import { Button, Modal, ModalHeaderWithClose } from '@/shared/ui';

export const ResendLink = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const t = useTranslations('resendLink');

  const params = useSearchParams();
  const getEmail = params.get('email');

  if (!getEmail) {
    return null;
  }

  const { mutate, isPending } = UseResendLink();

  const handleClick = () => {
    mutate(getEmail, {
      onSuccess: () => {
        setEmail(getEmail);
        setOpenModal(true);
      },
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.contentInner}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.text}>{t('text')}</p>
          <Button
            fullWidth={true}
            onClick={handleClick}
          >
            {isPending ? '...Loading' : t('resendBtn')}
          </Button>
        </div>
        <Image
          width={473}
          height={352}
          src={resendLinkIllustration}
          alt={'Илюстрация'}
        />
      </div>
      <Modal
        open={openModal}
        onOpenChange={setOpenModal}
        size='sm'
        header={
          <ModalHeaderWithClose
            title='Email sent'
            onClose={() => setOpenModal(false)}
          />
        }
      >
        <div className={s.modal}>
          <div>We have sent a link to confirm your email to {email}</div>

          <Button
            className={s.btnModal}
            fullWidth={false}
            onClick={() => setOpenModal(false)}
          >
            Ок
          </Button>
        </div>
      </Modal>
    </div>
  );
};
