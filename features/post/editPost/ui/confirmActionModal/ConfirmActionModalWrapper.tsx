'use client';
import { useConfirmModal } from '@/features/post/editPost/modal/useConfirmModal';
import { ConfirmActionModal } from '@/features/post/editPost/ui/confirmActionModal/ConfirmActionModal';

export const ConfirmActionModalWrapper = () => {
  const { open } = useConfirmModal();

  return open && <ConfirmActionModal open={open} />;
};
