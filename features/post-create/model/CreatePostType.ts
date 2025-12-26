export type CreatePostStep = '' | 'upload' | 'crop' | 'filter' | 'publish';

export type UploadedImage = {
  file: File;
  preview: string;
};

// type ImageMetadata = {
//   url: string;
//   width: number;
//   height: number;
//   fileSize: number;
//   createdAt: string; // или Date если будет парситься
//   uploadId: string;
// };

// type ImagesResponse = {
//   images: ImageMetadata[];
// };
