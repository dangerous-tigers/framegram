'use client';
import { Modal, ModalHeaderWithClose } from '@/shared/ui';
import { type Post } from '../../model/types';

import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { useAuth, useMediaQuery } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';
import { useViewPostStore } from '../../model/useViewPost.store';
import { PostContent } from './postContent/postContent';
import { Header } from './ui';

export function PostViewModal({ open, defaultOpen, post }: { open?: boolean; defaultOpen?: boolean; post?: Post }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user, isAuth, isLoading } = useAuth();

  const reset = useViewPostStore((state) => state.reset);
  const isEdit = useViewPostStore((state) => state.isEdit);

  const { setIsEdit } = useViewPostStore();
  const { show } = useConfirmStore();

  const { value } = useConfirmStore();

  const router = useRouter();

  if (!post) {
    // Если пост не существует, закрываем модальное окно
    router.back();
    return null;
  }

  const handleClose = () => {
    if (!isEdit) {
      router.back();
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
    >
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
