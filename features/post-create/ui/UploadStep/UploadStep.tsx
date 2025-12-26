import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { validateImage } from '@/shared/lib/file/validateImage';
import { UploadForm } from './UploadForm';
import { PolymorphicButton } from '@/shared/ui/buttonComponent/PolymorphicButton';
import s from './upload.module.scss';

export const UploadStep = () => {
  const addImages = useCreatePostStore((s) => s.addImages);
  const setStep = useCreatePostStore((s) => s.setStep);

  const handleSelectFiles = (files: File[]) => {
    try {
      files.forEach(validateImage);
      addImages(files);
      setStep('crop');
    } catch {
      alert('The photo must be less than 20 Mb and have JPEG or PNG format');
    }
  };

  return (
    <div className={s.wrapper}>
      <UploadForm onSelect={handleSelectFiles} />
      <PolymorphicButton
        className={s.btn}
        variant='outline'
      >
        Open Draft
      </PolymorphicButton>
    </div>
  );
};
