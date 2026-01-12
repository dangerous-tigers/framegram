import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,

} from '@/assets/icons/components';
import { useViewPostStore } from '@/features/post/viewPost/model';
import { ProfileImage } from '@/features/post/viewPost/ui/postModal/ui/profile-image/ProfileImage';
import { Popover } from '@/shared/ui/popover';
import clsx from 'clsx';
import { useState } from 'react';
import s from './Header.module.scss';
import { PostDeleteButton } from '@/features/post/removePost/ui/PostDeleteButton';
type Props = {
  avatar: string | undefined;
  userName: string | undefined;
  className?: string;
  userId: number;
  isAuth: boolean;
  postOwnerId: number;
  postId: number;
};

export function Header({ avatar, userName, postOwnerId, userId, isAuth, className, postId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { setIsEdit } = useViewPostStore();


  const isOwner = userId != null && postOwnerId != null && Number(userId) === Number(postOwnerId);

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
          {postId != null && typeof postId === 'number' && !isNaN(postId) && postId > 0 && (
            <PostDeleteButton
              postId={postId}
            />
          )}
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
