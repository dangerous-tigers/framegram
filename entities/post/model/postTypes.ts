export type UploadedImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt?: string;
  uploadId: string;
};

export type UploadPostImagesResponse = {
  images: UploadedImage[];
};
