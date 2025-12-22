'use client';
import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { ModalHeaderWithClose } from '@/shared/ui/modal/ModalHeaderWithClose';
import s from './LogoutModal.module.scss';
import { useLogout } from '../api/logout.api';
import { useMe } from '@/entities/user/model/useMe';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const LogoutModal = ({ open, setOpen }: Props) => {
  const t = useTranslations('sidebar');
  const { mutate } = useLogout();
  const { data } = useMe();

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('logOut')}
          onClose={() => setOpen(false)}
        />
      }
    >
      <div className={s.modalContent}>
        <p className={s.logoutMessage}>{t('logOutMessage', { email: data?.email })}</p>
        <div className={s.buttonContainer}>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
          >
            {t('no')}
          </Button>
          <Button
            variant='primary'
            onClick={() => mutate()}
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
