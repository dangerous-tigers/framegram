export type CreatePostStep = '' | 'upload' | 'crop' | 'filter' | 'publish';

export type UploadedImage = {
  id: string;
  file: File;
  preview: string;
  filter?: string;
}[];
