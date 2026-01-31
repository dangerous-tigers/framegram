'use client';
import { useRouter } from 'next/navigation';

import { Close } from '@/assets/icons';
import { PostViewModel } from '@/entities/profile';
import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { useAuth, useMediaQuery } from '@/shared/lib/hooks';
import { Button, Modal, ModalHeaderWithClose } from '@/shared/ui';

import { useViewPostStore } from '../../model/useViewPost.store';

import { PostContent } from './postContent/postContent';
import { Header } from './ui';

import s from './PostViewModal.module.scss';

export function PostViewModal({
  open,
  defaultOpen,
  post,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  post?: PostViewModel;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user, isAuth, isLoading } = useAuth();

  const reset = useViewPostStore((state) => state.reset);
  const isEdit = useViewPostStore((state) => state.isEdit);

  const { setIsEdit } = useViewPostStore();
  const { show } = useConfirmStore();

  const { value } = useConfirmStore();

  const router = useRouter();

  if (!post) {
    router.back();
    return null;
  }

  const handleClose = () => {
    if (!isEdit) {
      if (typeof window !== 'undefined' && window.history.length <= 1) {
        router.push(`/profile/${post.ownerId}`);
      } else {
        router.back();
      }
      reset();
    }
    if (isEdit && value !== post.description) {
      show();
    }
    if (isEdit && value === post.description) {
      setIsEdit(false);
    }
  };

  const renderHeader = () => {
    if (isEdit) {
      return (
        <ModalHeaderWithClose
          title='Edit post'
          onClose={handleClose}
        />
      );
    }

    if (isMobile) {
      return (
        <Header
          avatar={post.avatarOwner}
          userName={post.userName}
          postOwnerId={post.ownerId}
          userId={user?.userId || 0}
          isAuth={isAuth}
          postId={post.id || 0}
        />
      );
    }

    return null;
  };

  return (
    <Modal
      size='xl'
      open={open}
      onOpenChange={handleClose}
      defaultOpen={defaultOpen}
      header={renderHeader()}
      portal={false}
    >
      {!isEdit && (
        <Button
          variant='text'
          onClick={handleClose}
          className={s.closeButton}
        >
          <Close
            width={24}
            height={24}
          />
        </Button>
      )}

      <PostContent
        initialPost={post}
        userId={user?.userId || post.ownerId}
        isAuth={isAuth}
        isMobile={isMobile}
        isLoading={isLoading}
      />
    </Modal>
  );
}
