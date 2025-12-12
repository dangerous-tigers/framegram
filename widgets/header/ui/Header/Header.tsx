import s from './header.module.scss';
import clsx from 'clsx';
import { Logo } from '@/widgets/header/ui/Logo';
import { Notifications } from '@/widgets/header/ui/Notifications';
import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { getTranslations } from 'next-intl/server';

type PropsHeader = {
  className?: string;
};

export const Header = async (props: PropsHeader) => {
  const { className } = props;
  const t = await getTranslations('header');

  return (
    <header className={clsx(s.header, className)}>
      <div className='container'>
        <div className={s.headerBody}>
          <Logo />
          <Notifications />
          <ToggleLocale />
          <div className={s.buttons}>
            <button>{t('logIn')}</button>
            <button>{t('signUp')}</button>
          </div>
        </div>
      </div>
    </header>
  );
};
