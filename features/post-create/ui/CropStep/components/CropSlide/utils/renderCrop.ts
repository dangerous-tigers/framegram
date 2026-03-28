'use client';

import { AspectType } from '@/features/post-create/model/CreatePostType';

export function getTargetAspect(image: HTMLImageElement, aspect: AspectType): number {
  if (aspect === 'original') {
    return image.width / image.height;
  }

  if (aspect === '1:1') return 1;
  if (aspect === '4:5') return 4 / 5;
  return 16 / 9;
}

export function calculateCropDimensions(
  image: HTMLImageElement,
  zoom: number,
  aspect: AspectType,
  canvasWidth: number,
  canvasHeight: number,
  offsetX = 0,
  offsetY = 0,
) {
  const targetAspect = getTargetAspect(image, aspect);

  let sourceWidth: number;
  let sourceHeight: number;

  if (image.width / image.height > targetAspect) {
    sourceHeight = image.height;
    sourceWidth = sourceHeight * targetAspect;
  } else {
    sourceWidth = image.width;
    sourceHeight = sourceWidth / targetAspect;
  }

  sourceWidth /= zoom;
  sourceHeight /= zoom;

  const sourceX = (image.width - sourceWidth) / 2 - offsetX;
  const sourceY = (image.height - sourceHeight) / 2 - offsetY;

  const cropX = Math.max(0, Math.min(image.width - sourceWidth, sourceX));
  const cropY = Math.max(0, Math.min(image.height - sourceHeight, sourceY));

  const scale = Math.min(canvasWidth / sourceWidth, canvasHeight / sourceHeight);

  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;

  const dx = (canvasWidth - drawWidth) / 2;
  const dy = (canvasHeight - drawHeight) / 2;

  const maxOffsetX = Math.max(0, (image.width - sourceWidth) / 2);
  const maxOffsetY = Math.max(0, (image.height - sourceHeight) / 2);

  return {
    crop: {
      x: cropX,
      y: cropY,
      width: sourceWidth,
      height: sourceHeight,
    },
    dest: {
      x: dx,
      y: dy,
      width: drawWidth,
      height: drawHeight,
    },
    scale,
    maxOffsetX,
    maxOffsetY,
  };
}
