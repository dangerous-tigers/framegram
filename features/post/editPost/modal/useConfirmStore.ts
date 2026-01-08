import { create } from 'zustand';

const initialState = {
  open: false,
  value: undefined as string | undefined,
};

export type State = typeof initialState & {
  show: () => void;
  hide: () => void;
  setValue: (value: string | undefined) => void;
};

export const useConfirmStore = create<State>((set) => ({
  ...initialState,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
  setValue: (value) => set({ value }),
}));
