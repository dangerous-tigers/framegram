'use client';
import s from './upload.module.scss';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { validateImage } from '@/shared/lib/file/validateImage';
import { PolymorphicButton } from '@/shared/ui/buttonComponent/PolymorphicButton';
import { InputFile } from '@/shared/ui/inputFile';

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

  const handleLoadDraft = async () => {
    const store = useCreatePostStore.getState();

    await store.hydrate();

    // если draft есть — открываем нужный шаг
    if (store.images.length > 0) {
      store.setOpen(true);
    }
  };

  return (
    <div className={s.wrapper}>
      <InputFile
        multiple
        accept='image/png,image/jpeg'
        onSelect={handleSelectFiles}
      />
      <PolymorphicButton
        className={s.btn}
        variant='outline'
        onClick={handleLoadDraft}
      >
        Open Draft
      </PolymorphicButton>
    </div>
  );
};
