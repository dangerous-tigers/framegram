import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';

export const CropStep = () => {
  const images = useCreatePostStore((s) => s.images);
  const setStep = useCreatePostStore((s) => s.setStep);

  // Здесь предполагается,
  // что библиотека кропа вернёт новый File
  const onCropComplete = (croppedFiles: File[]) => {
    useCreatePostStore.setState(() => ({
      images: croppedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    }));

    setStep('filter');
  };

  return (
    <div>
      <h3>Crop images</h3>
      Cropper UI here aspect: 1:1 | 4:5 | 16:9
      <button onClick={() => onCropComplete(images.map((i) => i.file))}>Next</button>
      <button onClick={() => onCropComplete(images.map((i) => i.file))}>Next</button>
    </div>
  );
};
