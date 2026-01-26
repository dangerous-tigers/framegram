'use client';

import {
  Active,
  closestCenter,
  DragOverlay,
  DndContext,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { useSortable, SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Upload } from '../upload/upload';

import { Item, List } from './components';
import s from './Sortable.module.scss';

import { UploadedImage } from '@/features/post-create/model/CreatePostType';

export interface ImageItem {
  id: number;
  file: File;
  preview: string;
  filter?: string;
}

export interface Props {
  style?: React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  images: UploadedImage;
  setImages: (images: UploadedImage) => void;
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export const Sortable = (p: Props) => {
  const { wrapperStyle = () => ({}), images, setImages } = p;

  // State
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const isFirstAnnouncement = useRef(true);

  // Sensors for drag interaction
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));

  // Helper functions
  const getIndex = (id: UniqueIdentifier) => images.findIndex((item) => item.id === id);
  const activeIndex = activeId != null ? getIndex(activeId) : -1;

  const handleRemove = (id: UniqueIdentifier) => {
    setImages(images.filter((item) => item.id !== id));
  };

  const handleDragStart = (activeId: UniqueIdentifier | null) => {
    if (activeId) {
      setActiveId(activeId);
    }
  };

  const handleDragEnd = (overId: UniqueIdentifier | null) => {
    setActiveId(null);

    if (!overId) return;

    const overIndex = getIndex(overId);
    if (activeIndex !== overIndex) {
      setImages(arrayMove(images, activeIndex, overIndex));
    }
  };

  useEffect(() => {
    if (activeId == null) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => handleDragStart(active?.id ?? null)}
      onDragEnd={({ over }) => handleDragEnd(over?.id ?? null)}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={images}
        strategy={horizontalListSortingStrategy}
      >
        <div className={s.wrap}>
          <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                theme: 'os-theme-custom-manager',
              },
            }}
            className={s.overlayScrollbars}
          >
            <List className={s.list}>
              {images.map((item, index) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  isLastItem={images.length < 2}
                  onRemove={handleRemove}
                  wrapperStyle={undefined}
                  value={item.preview}
                  useDragOverlay
                />
              ))}
            </List>
          </OverlayScrollbarsComponent>
          <div className={s.input}>
            <Upload />
          </div>
        </div>
      </SortableContext>

      {createPortal(
        <DragOverlay
          style={{ zIndex: '2003' }}
          dropAnimation={dropAnimationConfig}
        >
          {activeId != null ? (
            <Item
              value={images[activeIndex].preview}
              wrapperStyle={wrapperStyle({
                active: { id: activeId },
                index: activeIndex,
                isDragging: true,
                id: images[activeIndex].id,
              })}
              onRemove={() => {}}
              dragOverlay
            />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

interface SortableItemProps {
  id: UniqueIdentifier;
  index: number;
  useDragOverlay?: boolean;
  onRemove(id: UniqueIdentifier): void;
  wrapperStyle: Props['wrapperStyle'];
  isLastItem?: boolean;
  value: string;
}

export const SortableItem = ({
  id,
  index,
  onRemove,
  isLastItem,
  value,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) => {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  return (
    <Item
      ref={setNodeRef}
      value={value}
      dragging={isDragging}
      sorting={isSorting}
      handleProps={{
        ref: setActivatorNodeRef,
      }}
      isLastItem={isLastItem}
      index={index}
      onRemove={() => onRemove(id)}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
};
