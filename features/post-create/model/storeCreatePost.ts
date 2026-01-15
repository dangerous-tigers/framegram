import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CreatePostStep, UploadedImage } from './CreatePostType';
import { saveDraft, loadDraft, clearDraft } from './indexedDb';
import type { DraftData } from './types';

export type CreatePostStateType = {
  step: CreatePostStep;
  images: UploadedImage;
  activeImageIndex: number;
  description: string;

  setStep: (step: CreatePostStep) => void;
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  setDescription: (value: string) => void;
  setActiveImageIndex: (value: number) => void;

  hydrate: () => Promise<void>;
  isHydrated: boolean;
  reset: () => Promise<void>;

  isOpen: boolean;
  setOpen: (value: boolean) => void;

  setImageFilter: (index: number, filter: string) => void;
};

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
        set(
          {
            ...draft,
            isHydrated: true,
          },
          false,
          'createPost/hydrate',
        );
      } else {
        set({ isHydrated: true }, false, 'createPost/hydrate');
      }
    },

    setStep: async (step) => {
      const draft = await loadDraft();

      const isDraft = () => {
        if (step === 'upload') {
          return draft?.step || 'upload';
        } else {
          return step;
        }
      };

      set({ step }, false, 'createPost/setStep');
      await saveDraft(pickDraft({ ...get(), step: isDraft() }));
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

    setActiveImageIndex: async (activeImageIndex) => {
      set({ activeImageIndex }, false, 'createPost/setActiveImageIndex');

      if (!get().isHydrated) return;

      await saveDraft({
        ...pickDraft(get()),
        activeImageIndex,
      });
    },

    reset: async () => {
      await clearDraft();
      set(
        {
          step: '',
          images: [],
          description: '',
          activeImageIndex: 0,
        },
        false,
        'createPost/reset',
      );
    },

    isOpen: false,
    setOpen: (isOpen) => {
      set({ isOpen }, false, 'createPost/setOpen');
    },

    //Добавление фильтра
    setImageFilter: (index, filter) => {
      set((state) => {
        const images = [...state.images];
        images[index] = { ...images[index], filter };
        saveDraft(pickDraft({ ...state, images }));
        return { images };
      });
    },
  })),
);
