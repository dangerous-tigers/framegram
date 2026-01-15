import s from './ProfileImage.module.scss';

type Props = {
  avatar: string | undefined;
  userName: string | undefined;
};

export const ProfileImage = ({ avatar, userName }: Props) => {
  return (
    <div className={s.userInfo}>
      <img
        src={avatar}
        alt='avatar'
        className={s.avatar}
      />
      <p className={s.userName}>{userName}</p>
    </div>
  );
};
