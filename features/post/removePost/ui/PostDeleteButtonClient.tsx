'use client';

import { useState } from 'react';
import { PostDeleteModal } from './PostDeleteModal';
import { useRemovePost } from '@/entities/post/model/useRemovePost';
import { TrashOutline } from '@/assets/icons';
import { useTranslations } from 'next-intl';
import s from './PostDeleteButtonClient.module.scss';

type Props = {
  postId: number;
  disabled?: boolean;
};

export const PostDeleteButtonClient = ({ postId, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: removePost, isPending, isError, error } = useRemovePost();
  const t = useTranslations('deletePostModal');

  const handleDelete = () => {

    if (postId == null || isNaN(Number(postId)) || Number(postId) <= 0) {

      return;
    }
    removePost(Number(postId), {
      onSuccess: (data) => {

        setOpen(false);
      },
      onError: (err) => {

      }
    });
  };

  return (
    <>
      <li
        onClick={(e) => {e.stopPropagation(); setOpen(true);}}
        className={s.listItemStyle}
        style={{ cursor: 'pointer' }}
        aria-disabled={disabled || isPending}
      >
        <TrashOutline />
        {t('delete')}
      </li>
      <PostDeleteModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isPending}
      />
    </>
  );
};
