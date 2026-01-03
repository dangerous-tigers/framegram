export type CreatePostStep = '' | 'upload' | 'crop' | 'filter' | 'publish';

export type UploadedImage = {
  file: File;
  preview: string;
  filter?: string;
}[];
