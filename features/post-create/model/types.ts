import type { CreatePostStep, UploadedImage, UploadedImageItem } from './CreatePostType';

export type DraftData = {
  step: CreatePostStep;
  images: UploadedImage;
  activeImageIndex: number;
  description: string;
};

export type CreatePostStateType = {
  step: CreatePostStep;
  images: UploadedImage;
  activeImageIndex: number;
  description: string;

  setStep: (step: CreatePostStep) => void;
  addImages: (files: File[]) => void;
  setImages: (images: UploadedImage) => void;
  updateActiveImage: (partialImage: Partial<UploadedImageItem>) => void;
  setZoom: (zoom: number) => void;
  setAspect: (aspect: AspectType) => void;
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

export type AspectType = 'original' | '1:1' | '4:5' | '16:9';
