'use client';

import s from './ForgotPasswordForm.module.scss';
import { Input } from '@/shared/ui/input';
import { ForgotPasswordData, forgotPasswordSchema } from '@/features/auth/ForgotPassword/model/ForgotPassword.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/button/Button';
import { Modal, ModalHeaderWithClose, Recaptcha } from '@/shared/ui';
import { useForgotPassword } from '@/features/auth/ForgotPassword/model/UseForgotPassword';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const ForgotPasswordForm = () => {
  const t = useTranslations('forgot');
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    setValue,
    trigger,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    reset,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data: ForgotPasswordData) => {
    mutate(
      {
        email: data.email,
        recaptcha: data.recaptcha,
        baseUrl: `${window.location.origin}/new-password`,
      },
      {
        onSuccess: () => {
          reset();
          setEmail(data.email);
          setOpenModal(true);
        },

        onError: (error) => {
          const message = error?.message ?? 'User with this email does not exist';
          setError('email', {
            type: 'server',
            message: message,
          });
        },
      },
    );
  });

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>{t('title')}</h2>
        <form
          onSubmit={onSubmit}
          className={s.form}
        >
          <Input
            label={'Email'}
            type='email'
            placeholder={'Epam@epam.com'}
            {...register('email')}
            error={errors.email?.message}
          />

          <p className={s.text}>{t('text')}</p>

          <div className={s.buttons}>
            <Button
              fullWidth={true}
              disabled={!isValid || isPending}
              type={'submit'}
              className={s.btn}
            >
              {isPending ? '...Loading' : t('sendLink')}
            </Button>
            <Button
              fullWidth={true}
              className={s.btn}
              variant={'text'}
            >
              {t('backToSignIn')}
            </Button>
          </div>
          <div className={s.captcha}>
            <Recaptcha
              register={register}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
            />
          </div>
        </form>
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
