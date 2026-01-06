'use client';
import { Heart, HeartOutline } from '@/assets/icons';
import { type Comment } from '../../../../model/types';
import s from './Comment.module.scss';
import clsx from 'clsx';
import { Description } from '..';
import { Answer } from '../answer/Answer';
import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useCommentAnswers, useViewPostStore } from '@/features/post/viewPost/model';
import { useTranslations } from 'next-intl';

type Props = {
  comment: Comment;
  postId: number;
  isAuth: boolean;
};

export function Comment({ comment, postId, isAuth }: Props) {
  const [openAnswer, setOpenAnswer] = useState(false);
  const { setType, setCommentId, setPostId, setComentUsername } = useViewPostStore();

  const { data: answers, isLoading } = useCommentAnswers({
    commentId: comment.id,
    postId,
    openAnswer,
  });

  const t = useTranslations('view-post');

  const handleAnswer = (id: number) => {
    alert('Answered by comment id: ' + id + ' by post id: ' + postId + ' by username: ' + comment.from.username);
    setType('answer');
    setComentUsername(comment.from.username);
    setPostId(id);
    setCommentId(comment.id);
  };
  const handleLike = (id: number) => {
    alert('Liked by comment id: ' + id);
  };
  const handleLikeAnswer = (id: number) => {
    alert('Liked by answer id: ' + id + ' by comment id: ' + comment.id);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Description
          avatar={comment.from.avatars[0].url}
          userName={comment.from.username}
          text={comment.content}
          timeStamp={comment.createdAt}
          likeCount={comment.likeCount}
          isLikeCount
          isAnswer={isAuth}
          onAnswerClick={() => handleAnswer(comment.id)}
        />

        {isAuth && (
          <Button
            variant='text'
            onClick={() => handleLike(comment.id)}
            className={clsx(s.likeButton, comment.isLiked && s.liked)}
          >
            {comment.isLiked ? <Heart /> : <HeartOutline />}
          </Button>
        )}
      </div>
      {comment.answerCount > 0 && (
        <div className={s.answersToggle}>
          <span className={s.line} />
          <Button
            variant='text'
            className={s.answerButton}
            onClick={() => setOpenAnswer((prev) => !prev)}
          >
            {openAnswer
              ? `${t('hideReplies')} (${comment.answerCount})`
              : `${t('showReplies')} (${comment.answerCount})`}
          </Button>
        </div>
      )}
      {!isLoading && answers && answers.length > 0 && openAnswer && (
        <div className={s.answers}>
          {answers.map((answer) => (
            <div key={answer.id}>
              <Answer
                key={answer.id}
                answer={answer}
                onLike={handleLikeAnswer}
                isAuth={isAuth}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
