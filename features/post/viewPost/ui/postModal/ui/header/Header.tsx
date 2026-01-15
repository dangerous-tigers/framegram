import clsx from 'clsx';
import { useState } from 'react';

import s from './Header.module.scss';

import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons/components';
import { useViewPostStore } from '@/features/post/viewPost/model';
import { ProfileImage } from '@/features/post/viewPost/ui/postModal/ui/profile-image/ProfileImage';
import { Popover } from '@/shared/ui/popover';
type Props = {
  avatar: string | undefined;
  userName: string | undefined;
  className?: string;
  userId: number;
  isAuth: boolean;
  postOwnerId: number;
};

export function Header({ avatar, userName, postOwnerId, userId, isAuth, className }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { setIsEdit } = useViewPostStore();

  const isOwner = userId === postOwnerId;
  const isFollow = false;

  const renderActions = () => {
    if (!isAuth) {
      return (
        <li onClick={copyLink}>
          <CopyOutline />
          <span>Copy link</span>
        </li>
      );
    }

    if (isOwner) {
      return (
        <ul>
          <li onClick={editPost}>
            <Edit2Outline />
            <span>Edit</span>
          </li>
          <li onClick={removePost}>
            <TrashOutline />
            <span>Delete</span>
          </li>
          <li onClick={copyLink}>
            <CopyOutline />
            <span>Copy link</span>
          </li>
        </ul>
      );
    }

    return (
      <ul>
        <li>
          {isFollow ? <PersonRemoveOutline onClick={unfollow} /> : <PersonAddOutline onClick={follow} />}
          {isFollow ? 'Unfollow' : 'Follow'}
        </li>
        <li onClick={copyLink}>
          <CopyOutline />
          <span>Copy link</span>
        </li>
      </ul>
    );
  };

  const editPost = () => {
    setIsEdit(true);
  };

  const removePost = () => {};

  const follow = () => {};

  const unfollow = () => {};

  const copyLink = () => {};

  return (
    <div className={clsx(s.header, className)}>
      <ProfileImage
        avatar={avatar}
        userName={userName}
      />
      <div className={s.headerActions}>
        <Popover
          open={open}
          onOpenChange={() => setOpen(!open)}
          isOwner={isOwner}
          isAuthorized={isAuth}
        >
          {renderActions()}
        </Popover>
      </div>
    </div>
  );
}
