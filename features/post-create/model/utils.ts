import { CreatePostStateType, DraftData } from './types';

export const pickDraft = (state: CreatePostStateType): DraftData => ({
  step: state.step,
  images: state.images.map((image) => ({ ...image, preview: '' })),
  activeImageIndex: state.activeImageIndex,
  description: state.description,
});
