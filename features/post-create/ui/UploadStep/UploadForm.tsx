import { InputFile } from '@/shared/ui/inputFile';

type Props = {
  onSelect: (files: File[]) => void;
};

export const UploadForm = ({ onSelect }: Props) => {
  return (
    <>
      <InputFile
        multiple
        accept='image/png,image/jpeg'
        onSelect={onSelect}
      />
    </>
  );
};
