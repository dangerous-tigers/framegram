import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { HeaderAuthButtons } from '@/widgets/header/ui/HeaderAuthButtons';
import { Logo } from '@/widgets/header/ui/Logo';
import { Notifications } from '@/widgets/header/ui/Notifications';

import s from './header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
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
