'use client';

import { memo, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import { useShallow } from 'zustand/react/shallow';

import { AspectType } from '@/features/post-create/model/CreatePostType';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useCropStore } from '@/features/post-create/model/storeCrop';

import { useCropContext } from '../../CropContext';

import { useCanvasResize } from './hooks/useCanvasResize';
import { canvasToFile } from './utils/canvasToFile';
import { fileToImage } from './utils/fileToImage';
import { calculateCropDimensions } from './utils/renderCrop';

type CropSlideProps = {
  id: string;
};

export const CropSlide = memo(function CropSlide({ id }: CropSlideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const imageNodeRef = useRef<Konva.Image>(null);

  const [img, setImage] = useState<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const image = useCreatePostStore(useShallow((state) => state.images.find((i) => i.id === id)));
  const updateActiveImage = useCreatePostStore((s) => s.updateActiveImage);

  const {
    zoom: storeZoom,
    aspect: storeAspect,
    x: storeX,
    y: storeY,
  } = useCropStore(useShallow((s) => s.crops[id] || { zoom: 1, aspect: 'original' as AspectType, x: 0, y: 0 }));

  const { getState, setCropState, commitCropState, subscribe } = useCropContext();

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

  useEffect(() => {
    const updateNode = (state: { zoom: number; aspect: AspectType; x: number; y: number }) => {
      if (!img || !imageNodeRef.current || size.width === 0 || size.height === 0) return;

      const { crop, dest } = calculateCropDimensions(
        img,
        state.zoom,
        state.aspect,
        size.width,
        size.height,
        state.x,
        state.y,
      );

      imageNodeRef.current.crop(crop);
      imageNodeRef.current.width(dest.width);
      imageNodeRef.current.height(dest.height);
      imageNodeRef.current.x(dest.x);
      imageNodeRef.current.y(dest.y);
      imageNodeRef.current.getLayer()?.batchDraw();
    };

    updateNode(getState(id));

    const unsubscribe = subscribe(id, (newState) => {
      updateNode(newState);
    });

    return () => unsubscribe();
  }, [id, img, size]);

  useEffect(() => {
    const saveCrop = async () => {
      if (!stageRef.current || !file) return;

      try {
        const canvas = stageRef.current.toCanvas({ pixelRatio: 2 });
        const cropFile = await canvasToFile(canvas, { name: file.name, type: 'image/png' });
        updateActiveImage({ file: cropFile });
      } catch {
        //console.error('Failed to save crop:', e);
      }
    };

    saveCrop();
  }, [file, storeZoom, storeAspect, storeX, storeY]);

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    isDragging.current = true;
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'grabbing';
    }
    const ptr = stage?.getPointerPosition();
    if (ptr) {
      lastPos.current = ptr;
    }
  };

  const handleDragMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDragging.current) return;
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const ptr = stage?.getPointerPosition();

    if (ptr && img) {
      const deltaX = ptr.x - lastPos.current.x;
      const deltaY = ptr.y - lastPos.current.y;

      lastPos.current = ptr;

      const currentState = getState(id);

      const { scale, maxOffsetX, maxOffsetY } = calculateCropDimensions(
        img,
        currentState.zoom,
        currentState.aspect,
        size.width,
        size.height,
        currentState.x,
        currentState.y,
      );

      const rawX = currentState.x + deltaX / scale;
      const rawY = currentState.y + deltaY / scale;

      const newX = Math.max(-maxOffsetX, Math.min(maxOffsetX, rawX));
      const newY = Math.max(-maxOffsetY, Math.min(maxOffsetY, rawY));

      setCropState(id, { x: newX, y: newY });
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (stageRef.current) {
      stageRef.current.container().style.cursor = 'grab';
    }
    if (
      //storeZoom !== getState(id).zoom ||
      //storeAspect !== getState(id).aspect ||
      storeX !== getState(id).x ||
      storeY !== getState(id).y
    ) {
      commitCropState(id);
    }
  };

  if (!img || size.width === 0 || size.height === 0 || !image) {
    return (
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  const initialState = getState(id);
  const { crop, dest } = calculateCropDimensions(
    img,
    initialState.zoom,
    initialState.aspect,
    size.width,
    size.height,
    initialState.x,
    initialState.y,
  );

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: '100%', touchAction: 'none', cursor: 'grab' }}
    >
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <Layer ref={layerRef}>
          <KonvaImage
            ref={imageNodeRef}
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
});
