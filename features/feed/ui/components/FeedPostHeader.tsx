import Link from 'next/link';

import { CopyOutline, PersonAddOutline, PersonRemoveOutline } from '@/assets/icons';
import { Popover } from '@/shared/ui/popover';
import { Avatar } from '@dangerous-tigers/framehub-ui-kit/components';

import { FeedPost } from '../../model/feed.api';

import s from '../FeedPage.module.scss';

type Props = {
  post: FeedPost;
  isFollowing: boolean;
  menuOpen: boolean;
  timeAgo: string;
  onMenuOpenChange: (open: boolean) => void;
  onToggleFollow: () => void;
};

export function FeedPostHeader({ post, isFollowing, menuOpen, timeAgo, onMenuOpenChange, onToggleFollow }: Props) {
  return (
    <header className={s.header}>
      <Link
        href={`/profile/${post.ownerId}`}
        className={s.author}
      >
        <Avatar
          src={post.avatarOwner}
          size='m'
          className={s.avatar}
        />
        <span className={s.username}>{post.userName}</span>
        <span className={s.dot}>&bull;</span>
        <span className={s.timeAgo}>{timeAgo}</span>
      </Link>
      <Popover
        open={menuOpen}
        onOpenChange={onMenuOpenChange}
        isOwner={false}
        isAuthorized
      >
        <li
          className={s.menuItem}
          onClick={onToggleFollow}
        >
          {isFollowing ? <PersonRemoveOutline /> : <PersonAddOutline />}
          <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
        </li>
        <li className={s.menuItem}>
          <CopyOutline />
          <span>Copy link</span>
        </li>
      </Popover>
    </header>
  );
}
