import s from './Answer.module.scss';
import { Description } from '..';
import { type Answer } from '../../../../model/types';
import { Heart, HeartOutline } from '@/assets/icons';
import clsx from 'clsx';
import { Button } from '@/shared/ui';

type Props = {
  answer: Answer;
  onLike: (id: number) => void;
  isAuth: boolean;
};

export function Answer({ answer, onLike, isAuth }: Props) {
  return (
    <div className={s.container}>
      <Description
        avatar={answer.from.avatars[0].url}
        userName={answer.from.username}
        text={answer.content}
        timeStamp={answer.createdAt}
        likeCount={answer.likeCount}
        isLikeCount
      />

      {isAuth && (
        <Button
          variant='text'
          onClick={() => onLike(answer.id)}
          className={clsx(s.likeButton, answer.isLiked && s.liked)}
        >
          {answer.isLiked ? <Heart /> : <HeartOutline />}
        </Button>
      )}
    </div>
  );
}
