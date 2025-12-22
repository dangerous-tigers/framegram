import s from './header.module.scss';
import clsx from 'clsx';
import { Logo } from '@/widgets/header/ui/Logo';
import { Notifications } from '@/widgets/header/ui/Notifications';
import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { routes } from '@/shared/config/routes';

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
            <Link
              className={s.link}
              href={routes.auth.login}
            >
              {t('logIn')}
            </Link>
            <Link
              className={s.linkBlue}
              href={routes.auth.registration}
            >
              {t('signUp')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
