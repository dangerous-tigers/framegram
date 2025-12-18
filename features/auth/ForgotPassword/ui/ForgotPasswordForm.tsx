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

export const ForgotPasswordForm = () => {
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
          setEmail(data.email);
          setOpenModal(true);
        },
        onError: (error) => {
          const message = error?.message?.[0] ?? 'User with this email does not exist';

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
        <h2 className={s.title}>Forgot Password</h2>
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

          <p className={s.text}>Enter your email and we will send you further instruction</p>

          <div className={s.buttons}>
            <Button
              fullWidth={true}
              disabled={!isValid || isPending}
              type={'submit'}
              className={s.btn}
            >
              Send Link
            </Button>
            <Button
              fullWidth={true}
              className={s.btn}
              variant={'text'}
            >
              Back to Sign In
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
