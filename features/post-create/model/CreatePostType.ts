export type CreatePostStep = '' | 'upload' | 'crop' | 'filter' | 'publish';

export type AspectType = 'original' | '1:1' | '4:5' | '16:9';

export type UploadedImage = {
  id: string;
  file: File;
  preview: string;
  filter?: string;
  originalFile: File;
}[];

export type UploadedImageItem = UploadedImage[number];
