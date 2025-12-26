import { create } from 'zustand';

type Nullable<T> = T | null;
type Severity = 'error' | 'success';
type Variant = 'default' | 'filled' | 'outlined';

const initialState = {
  open: true,
  error: null as Nullable<string>,
  description: null as Nullable<string>,
  variant: 'default' as Variant,
  severity: 'success' as Severity,
};

export type State = typeof initialState & {
  show: (data: Omit<State, 'open' | 'show' | 'hide'>) => void;
  hide: () => void;
};

export const useAlertStore = create<State>((set) => ({
  ...initialState,
  show: (data) => set({ open: true, ...data }),
  hide: () => set({ open: false }),
}));
