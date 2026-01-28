import s from './ProfileImage.module.scss';

import placeholderAvatar from '@/assets/illustrations/avatar-placeholder.png';

type Props = {
  avatar: string | undefined;
  userName: string | undefined;
};

export const ProfileImage = ({ avatar, userName }: Props) => {
  return (
    <div className={s.userInfo}>
      <img
        src={avatar || placeholderAvatar.src}
        alt='avatar'
        className={s.avatar}
      />
      <p className={s.userName}>{userName}</p>
    </div>
  );
};
