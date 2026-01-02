import { create } from 'zustand';

type PayloadType = 'comment' | 'answer';

type State = {
  type: PayloadType;
  isEdit: boolean;
  commentId: number | null;
  postId: number | null;
  commentUsername: string | null;
  content: string;

  setType: (type: PayloadType) => void;
  setIsEdit: (isEdit: boolean) => void;
  setCommentId: (commentId: number | null) => void;
  setPostId: (postId: number | null) => void;
  setContent: (content: string) => void;
  setComentUsername: (comentUsername: string | null) => void;

  reset: () => void;
};

export const useViewPostStore = create<State>((set) => ({
  type: 'comment',
  isEdit: false,
  commentId: null,
  postId: null,
  content: '',
  commentUsername: '',

  setType: (type: PayloadType) => set({ type }),
  setIsEdit: (isEdit) => set({ isEdit }),
  setCommentId: (commentId) => set({ commentId }),
  setPostId: (postId) => set({ postId }),
  setContent: (content) => set({ content }),
  setComentUsername: (commentUsername) => set({ commentUsername }),

  reset: () => set({ type: 'comment', commentId: null, postId: null, content: '', commentUsername: '' }),
}));
