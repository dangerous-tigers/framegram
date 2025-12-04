import s from './header.module.scss';
import clsx from 'clsx';
import { Logo } from '@/widgets/header/ui/Logo';
import { Notifications } from '@/widgets/header/ui/Notifications';

type PropsHeader = {
  className?: string;
};

export const Header = (props: PropsHeader) => {
  const { className } = props;

  return (
    <header className={clsx(className, s.header)}>
      <Logo />
      <Notifications />
      <select
        name='ir'
        id='ir'
      >
        <option value='ru'>RU</option>
        <option value='en'>EN</option>
      </select>
      <div className={s.buttons}>
        <button>Log in</button>
        <button>Sign up</button>
      </div>
    </header>
  );
};
