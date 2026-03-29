import { type Answer } from '../../../../model/types';
import { Description } from '..';

import s from './Answer.module.scss';

type Props = {
  answer: Answer;
};

export function Answer({ answer }: Props) {
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
    </div>
  );
}
