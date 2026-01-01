'use client';
import s from './Publish.module.scss';
import { Button } from '@/shared/ui';
import { useViewPostStore } from '@/features/post/viewPost/model/useViewPost.store';
import { useEffect, useRef } from 'react';
import { Close } from '@/assets/icons';
export function Publish({ postId }: { postId: number }) {
  const type = useViewPostStore((state) => state.type);
  const commentUsername = useViewPostStore((state) => state.commentUsername);
  const setContent = useViewPostStore((state) => state.setContent);
  const reset = useViewPostStore((state) => state.reset);

  const { commentId, content } = useViewPostStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (type !== 'answer') return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.focus();

    const rect = textarea.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isInViewport) {
      textarea.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [type, commentUsername]);

  function handlePublish() {
    if (type === 'comment') {
      alert(JSON.stringify({ postId, content }));
    }
    if (type === 'answer') {
      alert(JSON.stringify({ postId, commentId, content }));
    }
  }
  return (
    <div className={s.container}>
      <div className={s.textareaWrapper}>
        {/* <Textarea
          ref={textareaRef}
          placeholder='Add a Comment...'
          classNameTarget={s.textarea}
          rows={1}
        /> */}
        <textarea
          ref={textareaRef}
          placeholder='Add a Comment...'
          className={s.textarea}
          rows={1}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        {type === 'answer' && (
          <div className={s.atUsername}>
            Answer to<span>{` @${commentUsername}`}</span>
            <Button
              variant='text'
              className={s.closeButton}
              onClick={() => reset()}
            >
              <Close />
            </Button>
          </div>
        )}
      </div>
      <div>
        <Button
          onClick={handlePublish}
          variant='text'
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
