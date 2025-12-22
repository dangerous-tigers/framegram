'use client';

import { LogoutModal } from '@/features/auth/logout/ui/LogoutModal';
import { useState } from 'react';
import { Button } from '../../../../shared/ui/button/Button';
import { LogOut } from '@/assets/icons';
import { useTranslations } from 'next-intl';
import s from './LogoutButton.module.scss';
import clsx from 'clsx';

export function LogoutButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('sidebar');

  return (
    <>
      <Button
        className={clsx(s.logoutButton, className)}
        variant='text'
        onClick={() => setOpen(true)}
      >
        <div className={clsx(s.children, open === true && s.logoutButtonActive)}>
          <LogOut />
          <span>{t('logOut')}</span>
        </div>
      </Button>
      {open && (
        <LogoutModal
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
