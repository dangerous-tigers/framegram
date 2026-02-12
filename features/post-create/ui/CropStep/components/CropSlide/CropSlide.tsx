'use client';

import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import { useShallow } from 'zustand/react/shallow';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useCropStore } from '@/features/post-create/model/storeCrop';

import { useCanvasResize } from './hooks/useCanvasResize';
import { useDebounce } from './hooks/useDebounce';
import { canvasToFile } from './utils/canvasToFile';
import { fileToImage } from './utils/fileToImage';
import { calculateCropDimensions } from './utils/renderCrop';

type CropSlideProps = {
  id: string;
};

export function CropSlide({ id }: CropSlideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [img, setImage] = useState<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const image = useCreatePostStore(useShallow((state) => state.images.find((i) => i.id === id)));
  const updateActiveImage = useCreatePostStore((s) => s.updateActiveImage);

  const { zoom, aspect } = useCropStore(useShallow((s) => s.crops[id] || { zoom: 1, aspect: 'original' }));
  const initCrop = useCropStore((s) => s.initCrop);

  useEffect(() => {
    initCrop(id);
  }, [id, initCrop]);

  const file = image?.originalFile;

  useEffect(() => {
    if (!file) return;

    fileToImage(file).then((image) => {
      setImage(image);
    });
  }, [file]);

  useCanvasResize(wrapperRef.current, (width, height) => {
    setSize({ width, height });
  });

  useDebounce(
    async () => {
      if (!stageRef.current || !file) return;

      const canvas = stageRef.current.toCanvas({ pixelRatio: 2 });
      const cropFile = await canvasToFile(canvas, { name: file.name, type: 'image/png' });

      updateActiveImage({ file: cropFile });
    },
    500,
    [zoom, aspect],
  );

  if (!img || size.width === 0 || size.height === 0 || !image) {
    return (
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  const { crop, dest } = calculateCropDimensions(img, zoom, aspect, size.width, size.height);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: '100%' }}
    >
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
      >
        <Layer>
          <KonvaImage
            image={img}
            crop={crop}
            x={dest.x}
            y={dest.y}
            width={dest.width}
            height={dest.height}
          />
        </Layer>
      </Stage>
    </div>
  );
}
