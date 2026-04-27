'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { Heart, HeartOutline } from '@/assets/icons';
import { useCommentAnswers, useViewPostStore } from '@/features/post/viewPost/model';
import { usePostAnswerLikeMutation } from '@/features/post/viewPost/model/usePostAnswerLikeMutation';
import { usePostCommentLikeMutation } from '@/features/post/viewPost/model/usePostCommentLikeMutation';
import { Button } from '@/shared/ui';

import { type Comment } from '../../../../model/types';
import { Answer } from '../answer/Answer';
import { Description } from '..';

import s from './Comment.module.scss';

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

  const mutation = usePostCommentLikeMutation();
  const answerMutation = usePostAnswerLikeMutation();

  const t = useTranslations('viewPost');

  const handleAnswer = (id: number) => {
    setType('answer');
    setComentUsername(comment.from.username);
    setPostId(id);
    setCommentId(comment.id);
  };
  const handleLike = (commentId: number) => {
    mutation.mutate({
      commentId,
      postId,
      likeStatus: comment.isLiked ? 'NONE' : 'LIKE',
    });
  };
  const handleLikeAnswer = (id: number) => {
    const isLikes = answers?.find((answer) => answer.id === id)?.isLiked;

    answerMutation.mutate({
      answerId: id,
      commentId: comment.id,
      postId,
      likeStatus: isLikes ? 'NONE' : 'LIKE',
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Description
          avatar={comment.from.avatars[0]?.url}
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
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
