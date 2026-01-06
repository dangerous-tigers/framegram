import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';

export const useConfirmModal = () => {
  const { open, show, hide } = useConfirmStore();

  return { hide, open, show };
};
