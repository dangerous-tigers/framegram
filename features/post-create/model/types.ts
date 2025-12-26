import type { CreatePostStep, UploadedImage } from './CreatePostType';

export type DraftData = {
  step: CreatePostStep;
  images: UploadedImage[];
  activeImageIndex: number;
  description: string;
};
