'use client';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { useViewPostStore } from '@/features/post/viewPost/model/useViewPost.store';
import { Button } from '@/shared/ui';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { Textarea } from '@/shared/ui/textarea';

import s from './Publish.module.scss';

export function Publish({ postId }: { postId: number }) {
  const type = useViewPostStore((state) => state.type);
  const setType = useViewPostStore((state) => state.setType);
  const commentUsername = useViewPostStore((state) => state.commentUsername);
  const setContent = useViewPostStore((state) => state.setContent);
  const reset = useViewPostStore((state) => state.reset);
  const t = useTranslations('viewPost');
  const { show } = useAlertStore();

  const ANSWER_PREFIX = `@${commentUsername} `;

  const { commentId, content } = useViewPostStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (type !== 'answer') return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();
    setContent(ANSWER_PREFIX);

    const rect = textarea.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isInViewport) {
      textarea.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [type, commentUsername]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    setContent(newValue);

    if (type === 'answer' && !newValue.startsWith(ANSWER_PREFIX)) {
      setType('comment');
      setContent('');
    }
  }

  function handlePublish() {
    const trimmedContent = content.startsWith(ANSWER_PREFIX) ? content.slice(ANSWER_PREFIX.length) : content.trim();

    if (!trimmedContent) {
      show({
        error: t('emptyFieldError'),
        severity: 'error',
        variant: 'default',
        description: null,
      });
      return;
    }

    if (type === 'answer' && content.trim().startsWith(ANSWER_PREFIX)) {
      const answerContent = content.trim().slice(ANSWER_PREFIX.length).trim();

      if (content.length === ANSWER_PREFIX.length) {
        show({
          error: t('emptyAnswerError'),
          severity: 'error',
          variant: 'default',
          description: null,
        });
        return;
      }

      alert(
        JSON.stringify({
          type: 'answer',
          postId,
          commentId,
          content: answerContent,
        }),
      );
    } else {
      alert(
        JSON.stringify({
          type: 'comment',
          postId,
          content: trimmedContent,
        }),
      );
    }
    reset();
  }
  return (
    <div className={s.container}>
      <div className={s.textareaWrapper}>
        <Textarea
          ref={textareaRef}
          placeholder={t('commentPlaceholder')}
          direction='none'
          classNameTarget={s.textarea}
          onChange={handleChange}
          value={content}
          rows={1}
        />

        <Button
          onClick={handlePublish}
          className={s.publishButton}
          variant='text'
        >
          {t('publish')}
        </Button>
      </div>
    </div>
  );
}
