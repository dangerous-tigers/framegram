import { CreatePostStateType, DraftData } from './types';

export const pickDraft = (state: CreatePostStateType): DraftData => ({
  step: state.step,
  images: state.images,
  activeImageIndex: state.activeImageIndex,
  description: state.description,
});
