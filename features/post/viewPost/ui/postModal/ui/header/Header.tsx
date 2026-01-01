import { MoreHorizontalOutline } from '@/assets/icons';
import { Button } from '@/shared/ui';
import s from './Header.module.scss';
import clsx from 'clsx';
type Props = {
  avatar: string | undefined;
  userName: string | undefined;
  className?: string;
  userId: number;
  isAuth: boolean;
  postOwnerId: number;
};

export function Header({ avatar, userName, postOwnerId, userId, isAuth, className }: Props) {
  const renderActions = () => {
    if (!isAuth) {
      return null;
    }

    if (userId === postOwnerId) {
      return (
        <Button variant='text'>
          <MoreHorizontalOutline /> Мой пост
        </Button>
      );
    }

    return (
      <Button variant='text'>
        <MoreHorizontalOutline /> Пост пользователя
      </Button>
    );
  };

  return (
    <div className={clsx(s.header, className)}>
      <div className={s.userInfo}>
        <img
          src={avatar}
          alt='avatar'
          className={s.avatar}
        />
        <p className={s.userName}>{userName}</p>
      </div>
      <div className={s.headerActions}>{renderActions()}</div>
    </div>
  );
}
