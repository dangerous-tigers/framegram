import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui/input';

import s from '../FeedPage.module.scss';

export function FeedCommentComposer() {
  return (
    <div className={s.addCommentRow}>
      <Input
        className={s.commentInput}
        placeholder='Add a Comment...'
        readOnly
      />
      <Button
        variant='text'
        className={s.publishBtn}
      >
        Publish
      </Button>
    </div>
  );
}
