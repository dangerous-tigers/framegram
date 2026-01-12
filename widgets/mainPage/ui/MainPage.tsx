import clsx from 'clsx';
import s from './MainPage.module.scss';
import { UserCounter } from '@/widgets/registeredUsers/ui/userCounter';

export const MainPage = () => {
  return (
    <div className={clsx(s.mainPage)}>
      <UserCounter />
    </div>
  );
};
