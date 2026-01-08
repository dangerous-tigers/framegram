export const applyFilterToFile = async (file: File, filter?: string): Promise<File> => {
  if (!filter) return file;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.filter = filter;
  ctx.drawImage(img, 0, 0);

  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(file);
          return;
        }

        resolve(
          new File([blob], file.name, {
            type: file.type,
          }),
        );
      },
      file.type,
      0.95,
    );
  });
};
