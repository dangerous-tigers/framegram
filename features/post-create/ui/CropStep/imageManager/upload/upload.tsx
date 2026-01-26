'use client';
import s from './Upload.module.scss';

import { PlusCircleOutline } from '@/assets/icons';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { validateImage } from '@/shared/lib/file/validateImage';
import { InputFile } from '@/shared/ui/inputFile';

export const Upload = () => {
  const addImages = useCreatePostStore((s) => s.addImages);

  const handleSelectFiles = (files: File[]) => {
    try {
      files.forEach(validateImage);
      addImages(files);
    } catch {
      alert('The photo must be less than 20 Mb and have JPEG or PNG format');
    }
  };

  return (
    <InputFile
      multiple
      accept='image/png,image/jpeg'
      onSelect={handleSelectFiles}
    >
      <PlusCircleOutline className={s.icon} />
    </InputFile>
  );
};
