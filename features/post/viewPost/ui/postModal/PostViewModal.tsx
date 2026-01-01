'use client';
import { Modal } from '@/shared/ui';
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

  const router = useRouter();
  const handleClose = () => {
    router.back();
    reset();
  };

  if (!post) {
    return null;
  }

  return (
    <Modal
      size='xl'
      open={open}
      onOpenChange={handleClose}
      defaultOpen={defaultOpen}
      header={
        isMobile && (
          <Header
            avatar={post.avatarOwner}
            userName={post.userName}
            postOwnerId={post.ownerId}
            userId={user?.userId}
            isAuth={isAuth}
          />
        )
      }
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
