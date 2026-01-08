'use client';
import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { ConfirmActionModal } from '@/features/post/editPost/ui/confirmActionModal/ConfirmActionModal';

export const ConfirmActionModalWrapper = () => {
  const { open } = useConfirmStore();

  return open && <ConfirmActionModal open={open} />;
};
