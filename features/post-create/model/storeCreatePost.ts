import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { UploadedImageItem } from './CreatePostType';
import { clearDraft, loadDraft, saveDraft } from './indexedDb';
import type { CreatePostStateType } from './types';
import { pickDraft } from './utils';

export const useCreatePostStore = create<CreatePostStateType>()(
  devtools((set, get) => ({
    step: '',
    images: [],
    activeImageIndex: 0,
    description: '',

    hydrate: async () => {
      const draft = await loadDraft();

      if (draft && draft.images) {
        const images = draft.images.map((img) => ({
          ...img,
          preview: URL.createObjectURL(img.file),
        }));

        set(
          {
            ...draft,
            images,
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

    updateActiveImage: (partialImage) => {
      set((state) => {
        const images = [...state.images];
        const activeImage = images[state.activeImageIndex];
        const partialFile = partialImage.file;
        if (activeImage) {
          if (partialFile && partialFile !== activeImage.file) {
            URL.revokeObjectURL(activeImage.preview);
            partialImage.preview = URL.createObjectURL(partialFile);
          }

          images[state.activeImageIndex] = { ...activeImage, ...partialImage };
        }
        saveDraft(pickDraft({ ...state, images }));
        return { images };
      });
    },

    addImages: (files) =>
      set((state) => {
        const newImages = files.slice(0, 10 - state.images.length).map(
          (file) =>
            ({
              id: crypto.randomUUID(),
              file,
              preview: URL.createObjectURL(file),
              originalFile: file,
            }) as UploadedImageItem,
        );

        const images = [...state.images, ...newImages];

        saveDraft(pickDraft({ ...state, images }));
        return { images };
      }),

    setImages: (newImages) =>
      set((state) => {
        const images = [...newImages];

        saveDraft(pickDraft({ ...state, images }));
        return { images };
      }),

    removeImage: (index) =>
      set(
        (state) => {
          const imageToRemove = state.images[index];
          if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.preview);
          }
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

    cleanup: () => {
      const images = get().images;
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    },

    reset: async () => {
      await clearDraft();

      get().images.forEach((img) => URL.revokeObjectURL(img.preview));

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
