import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AspectType } from './CreatePostType';

type CropState = {
  crops: Record<
    string,
    {
      zoom: number;
      aspect: AspectType;
      x: number;
      y: number;
    }
  >;

  setZoom: (id: string, zoom: number) => void;
  setAspect: (id: string, aspect: AspectType) => void;
  setCropPosition: (id: string, x: number, y: number) => void;
  setCrop: (
    id: string,
    payload: {
      zoom?: number;
      aspect?: AspectType;
      x?: number;
      y?: number;
    },
  ) => void;
  initCrop: (id: string) => void;
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
              ...(state.crops[id] || { aspect: 'original', zoom: 1, x: 0, y: 0 }),
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
              ...(state.crops[id] || { aspect: 'original', zoom: 1, x: 0, y: 0 }),
              aspect,
              x: 0,
              y: 0,
            },
          },
        }),
        false,
        'crop/setAspect',
      ),

    setCropPosition: (id, x, y) =>
      set(
        (state) => ({
          crops: {
            ...state.crops,
            [id]: {
              ...(state.crops[id] || { aspect: 'original', zoom: 1, x: 0, y: 0 }),
              x,
              y,
            },
          },
        }),
        false,
        'crop/setCropPosition',
      ),

    setCrop: (id, payload) =>
      set(
        (state) => ({
          crops: {
            ...state.crops,
            [id]: {
              ...(state.crops[id] || { aspect: 'original', zoom: 1, x: 0, y: 0 }),
              ...payload,
            },
          },
        }),
        false,
        'crop/setCrop',
      ),

    initCrop: (id) =>
      set(
        (state) => {
          if (state.crops[id]) return {};
          return {
            crops: {
              ...state.crops,
              [id]: { zoom: 1, aspect: 'original', x: 0, y: 0 },
            },
          };
        },
        false,
        'crop/initCrop',
      ),

    reset: () => set({ crops: {} }, false, 'crop/reset'),
  })),
);
