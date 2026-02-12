import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AspectType } from './CreatePostType';

type CropState = {
  crops: Record<
    string,
    {
      zoom: number;
      aspect: AspectType;
    }
  >;

  setZoom: (id: string, zoom: number) => void;
  setAspect: (id: string, aspect: AspectType) => void;
  initCrop: (id: string) => void;
  removeCrop: (id: string) => void;
  reset: () => void;
};

export const useCropStore = create<CropState>()(
  devtools((set) => ({
    crops: {},

    setZoom: (id, zoom) =>
      set(
        (state) => ({
          crops: {
            ...state.crops,
            [id]: {
              ...(state.crops[id] || { aspect: 'original', zoom: 1 }),
              zoom,
            },
          },
        }),
        false,
        'crop/setZoom',
      ),

    setAspect: (id, aspect) =>
      set(
        (state) => ({
          crops: {
            ...state.crops,
            [id]: {
              ...(state.crops[id] || { aspect: 'original', zoom: 1 }),
              aspect,
            },
          },
        }),
        false,
        'crop/setAspect',
      ),

    initCrop: (id) =>
      set(
        (state) => {
          if (state.crops[id]) return {};
          return {
            crops: {
              ...state.crops,
              [id]: { zoom: 1, aspect: 'original' },
            },
          };
        },
        false,
        'crop/initCrop',
      ),

    reset: () => set({ crops: {} }, false, 'crop/reset'),
  })),
);
