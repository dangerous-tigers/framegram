'use client';

export function canvasToFile(
  canvas: HTMLCanvasElement,
  {
    type = 'image/jpeg',
    quality = 0.92,
    name = 'image.jpg',
  }: {
    type?: 'image/jpeg' | 'image/png' | 'image/webp';
    quality?: number;
    name?: string;
  } = {},
): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to export canvas'));
          return;
        }

        resolve(
          new File([blob], name, {
            type,
            lastModified: Date.now(),
          }),
        );
      },
      type,
      quality,
    );
  });
}
