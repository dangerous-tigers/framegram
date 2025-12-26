'use client';

import { useState } from 'react';
import { PostDeleteModal } from './PostDeleteModal';
import { useRemovePost } from '@/entities/post/model/useRemovePost';
import { MoreHorizontal } from '@/assets/icons';
import { Button } from '@/shared/ui/button/Button';

type Props = {
  postId: number;
  disabled?: boolean;
};

export const PostDeleteButtonClient = ({ postId, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: removePost, isPending } = useRemovePost();

  const handleDelete = () => {
    removePost(postId);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant='text'
        onClick={() => setOpen(true)}
        disabled={disabled || isPending}
        style={{ padding: '8px' }}
      >
        <MoreHorizontal />
      </Button>
      <PostDeleteModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={isPending}
      />
    </>
  );
};
