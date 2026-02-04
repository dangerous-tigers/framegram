import clsx from 'clsx';

import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { Notifications } from '@/shared/ui';
import { HeaderAuthButtons } from '@/widgets/header/ui/HeaderAuthButtons';
import { Logo } from '@/widgets/header/ui/Logo';

import s from './header.module.scss';

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
