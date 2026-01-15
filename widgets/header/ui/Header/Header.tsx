import clsx from 'clsx';

import s from './header.module.scss';

import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { HeaderAuthButtons } from '@/widgets/header/ui/HeaderAuthButtons';
import { Logo } from '@/widgets/header/ui/Logo';
import { Notifications } from '@/widgets/header/ui/Notifications';

type PropsHeader = {
  className?: string;
};

export const Header = async (props: PropsHeader) => {
  const { className } = props;

  return (
    <header className={clsx(s.header, className)}>
      <div className='container'>
        <div className={s.headerBody}>
          <Logo />
          <Notifications />
          <ToggleLocale />
          <HeaderAuthButtons />
        </div>
      </div>
    </header>
  );
};
