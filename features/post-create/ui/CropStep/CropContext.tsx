'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { AspectType } from '@/features/post-create/model/CreatePostType';
import { useCropStore } from '@/features/post-create/model/storeCrop';

type CropState = {
  zoom: number;
  aspect: AspectType;
  x: number;
  y: number;
};

type CropContextType = {
  getState: (id: string) => CropState;
  setCropState: (id: string, state: Partial<CropState>) => void;
  commitCropState: (id: string) => void;
  subscribe: (id: string, callback: (state: CropState) => void) => () => void;
};

const CropContext = createContext<CropContextType | null>(null);

export const CropProvider = ({ children }: { children: React.ReactNode }) => {
  const cropsRef = useRef<Record<string, CropState>>({});

  const listeners = useRef<Record<string, Set<(state: CropState) => void>>>({});

  const globalCrops = useCropStore((s) => s.crops);
  const globalCropsRef = useRef(globalCrops);

  const setCrop = useCropStore((s) => s.setCrop);

  useEffect(() => {
    globalCropsRef.current = globalCrops;
    Object.entries(globalCrops).forEach(([id, crop]) => {
      if (!cropsRef.current[id]) {
        cropsRef.current[id] = {
          zoom: crop.zoom,
          aspect: crop.aspect,
          x: crop.x || 0,
          y: crop.y || 0,
        };
      }
    });
  }, [globalCrops]);

  const getState = useCallback((id: string) => {
    if (!cropsRef.current[id]) {
      const global = globalCropsRef.current[id];
      cropsRef.current[id] = global
        ? { ...global, x: global.x || 0, y: global.y || 0 }
        : { zoom: 1, aspect: 'original', x: 0, y: 0 };
    }
    return cropsRef.current[id];
  }, []);

  const setCropState = useCallback((id: string, partial: Partial<CropState>) => {
    const currentState = getState(id);
    const nextState = { ...currentState, ...partial };

    cropsRef.current[id] = nextState;

    if (listeners.current[id]) {
      listeners.current[id].forEach((cb) => cb(nextState));
    }
  }, []);

  const commitCropState = useCallback((id: string) => {
    const state = cropsRef.current[id];
    if (!state) return;

    setCrop(id, {
      zoom: state.zoom,
      aspect: state.aspect,
      x: state.x,
      y: state.y,
    });
  }, []);

  const subscribe = useCallback((id: string, callback: (state: CropState) => void) => {
    if (!listeners.current[id]) {
      listeners.current[id] = new Set();
    }
    listeners.current[id].add(callback);

    return () => {
      listeners.current[id]?.delete(callback);
      if (listeners.current[id]?.size === 0) {
        delete listeners.current[id];
      }
    };
  }, []);

  const value = useMemo(
    () => ({ getState, setCropState, commitCropState, subscribe }),
    [getState, setCropState, commitCropState, subscribe],
  );

  return <CropContext.Provider value={value}>{children}</CropContext.Provider>;
};

export const useCropContext = () => {
  const context = useContext(CropContext);
  if (!context) {
    throw new Error('useCropContext must be used within a CropProvider');
  }
  return context;
};
