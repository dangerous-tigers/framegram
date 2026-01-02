'use client';
import { Modal, ModalHeaderWithClose } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { type Post } from '../../model/types';

import { Header } from './ui';
import { PostContent } from './postContent/postContent';
import { useViewPostStore } from '../../model/useViewPost.store';
import { useAuth, useMediaQuery } from '@/shared/lib/hooks';

export function PostViewModal({ open, defaultOpen, post }: { open?: boolean; defaultOpen?: boolean; post?: Post }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user, isAuth, isLoading } = useAuth();

  const reset = useViewPostStore((state) => state.reset);
  const isEdit = useViewPostStore((state) => state.isEdit);

  const router = useRouter();
  const handleClose = () => {
    router.back();
    reset();
  };

  if (!post) {
    return null;
  }

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
          userId={user?.userId}
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
        post={post}
        userId={user?.userId}
        isAuth={isAuth}
        isMobile={isMobile}
        isLoading={isLoading}
      />
    </Modal>
  );
}
