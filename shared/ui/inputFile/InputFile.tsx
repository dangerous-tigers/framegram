import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';

import s from './inputFile.module.scss';

import { ImageOutline } from '@/assets/icons';
import { PolymorphicButton } from '@/shared/ui/buttonComponent/PolymorphicButton';

type Props = {
  onSelect: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export const InputFile = ({
  onSelect,
  multiple = false,
  accept = 'image/*',
  disabled = false,
  className,
  children,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const openDialog = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onSelect(Array.from(files));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={clsx(s.wrapper, className)}>
      <input
        ref={inputRef}
        className={s.inputFile}
        type='file'
        hidden
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
      />

      <div
        className={clsx(s.dropzone, {
          [s.dragOver]: isDragOver,
          [s.disabled]: disabled,
        })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openDialog}
      >
        {children ?? (
          <>
            <p className={s.drag}>
              <ImageOutline
                width={36}
                height={36}
              />
            </p>

            <PolymorphicButton
              type='button'
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                openDialog();
              }}
            >
              Select from Computer
            </PolymorphicButton>
          </>
        )}
      </div>
    </div>
  );
};
