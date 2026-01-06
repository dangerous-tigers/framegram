'use client';
import { Modal, ModalHeaderWithClose } from '@/shared/ui';
import { type Post } from '../../model/types';

import { useConfirmModal } from '@/features/post/editPost/modal/useConfirmModal';
import { ConfirmActionModalWrapper } from '@/features/post/editPost/ui/confirmActionModal/ConfirmActionModalWrapper';
import { useAuth, useMediaQuery } from '@/shared/lib/hooks';
import { useViewPostStore } from '../../model/useViewPost.store';
import { PostContent } from './postContent/postContent';
import { Header } from './ui';

export function PostViewModal({ open, defaultOpen, post }: { open?: boolean; defaultOpen?: boolean; post?: Post }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user, isAuth, isLoading } = useAuth();

  // const reset = useViewPostStore((state) => state.reset);
  const isEdit = useViewPostStore((state) => state.isEdit);
  const { show, open } = useConfirmModal();

  // const router = useRouter();

  const handleClose = () => {
    show();
    // router.back();
    // reset();
  };

  if (!post) {
    return null;
  }

  const renderHeader = () => {
    if (isEdit) {
      return (
        <>
          <ModalHeaderWithClose
            title='Edit post'
            onClose={handleClose}
          />
          <ConfirmActionModalWrapper />
        </>
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
        initialPost={post}
        userId={user?.userId}
        isAuth={isAuth}
        isMobile={isMobile}
        isLoading={isLoading}
      />
    </Modal>
  );
}
