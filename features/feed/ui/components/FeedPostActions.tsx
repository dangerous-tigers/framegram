import { BookmarkOutline, HeartOutline, MessageCircleOutline, PaperPlaneOutline } from '@/assets/icons';

import s from '../FeedPage.module.scss';

export function FeedPostActions({ likesCount }: { likesCount: number }) {
  return (
    <>
      <div className={s.actions}>
        <div className={s.actionsLeft}>
          <HeartOutline />
          <MessageCircleOutline />
          <PaperPlaneOutline />
        </div>
        <BookmarkOutline />
      </div>
      <p className={s.likes}>{likesCount.toLocaleString()} Like</p>
    </>
  );
}
