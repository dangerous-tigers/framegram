import { Notifications } from '@/features/notifications';
import { ToggleLocale } from '@/shared/components/toggleLocale/ToggleLocale';
import { HeaderAuthButtons } from '@/widgets/header/ui/HeaderAuthButtons';
import { Logo } from '@/widgets/header/ui/Logo';

import s from './header.module.scss';

type PropsHeader = {
  className?: string;
};

export const Header: React.FC<PropsHeader> = () => {
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
