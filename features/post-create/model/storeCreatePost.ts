import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CreatePostStep, UploadedImage } from './CreatePostType';
import { saveDraft, loadDraft, clearDraft } from './indexedDb';
import type { DraftData } from './types';

export type CreatePostStateType = {
  step: CreatePostStep;
  images: UploadedImage[];
  activeImageIndex: number;
  description: string;

  setStep: (step: CreatePostStep) => void;
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  setDescription: (value: string) => void;

  hydrate: () => Promise<void>;
  reset: () => Promise<void>;
};

/**
 * ✅ ВАЖНО:
 * Забираем ТОЛЬКО данные, без функций
 */
const pickDraft = (state: CreatePostStateType): DraftData => ({
  step: state.step,
  images: state.images,
  activeImageIndex: state.activeImageIndex,
  description: state.description,
});

export const useCreatePostStore = create<CreatePostStateType>()(
  devtools((set, get) => ({
    step: '',
    images: [],
    activeImageIndex: 0,
    description: '',

    hydrate: async () => {
      const draft = await loadDraft();
      if (draft) {
        set(draft, false, 'createPost/hydrate');
      }
    },

    setStep: (step) => {
      set({ step }, false, 'createPost/setStep');
      saveDraft(pickDraft({ ...get(), step }));
    },

    addImages: (files) =>
      set((state) => {
        const images = [
          ...state.images,
          ...files.slice(0, 10 - state.images.length).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          })),
        ];

        saveDraft(pickDraft({ ...state, images }));
        return { images };
      }),

    removeImage: (index) =>
      set(
        (state) => {
          const images = state.images.filter((_, i) => i !== index);
          saveDraft(pickDraft({ ...state, images }));
          return { images };
        },
        false,
        'createPost/removeImage',
      ),

    setDescription: (description) => {
      set({ description }, false, 'createPost/setDescription');
      saveDraft(pickDraft({ ...get(), description }));
    },

    reset: async () => {
      await clearDraft();
      set(
        {
          step: 'upload',
          images: [],
          description: '',
          activeImageIndex: 0,
        },
        false,
        'createPost/reset',
      );
    },
  })),
);
