import { create } from 'zustand';

const initialState = {
  open: false,
};

export type State = typeof initialState & {
  show: () => void;
  hide: () => void;
};

export const useModalStore = create<State>((set) => ({
  ...initialState,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
