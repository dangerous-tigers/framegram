'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
import { arrayMove, useSortable, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { Item, List } from './components';

import s from './Sortable.module.scss';
import { PlusCircleOutline } from '@/assets/icons';

export interface Props {
  reorderItems?: typeof arrayMove;
  style?: React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
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
  const { wrapperStyle = () => ({}) } = p;

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState<UniqueIdentifier[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
  const activeIndex = activeId != null ? getIndex(activeId) : -1;
  const handleRemove = (id: UniqueIdentifier) =>
    setItems((items: UniqueIdentifier[]) => items.filter((item) => item !== id));

  useEffect(() => {
    if (activeId == null) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);

        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={items}
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
            defer
          >
            <List className={s.list}>
              {items.map((value, index) => (
                <SortableItem
                  key={value}
                  id={value}
                  index={index}
                  isLastItem={items.length < 2}
                  onRemove={handleRemove}
                  wrapperStyle={undefined}
                  useDragOverlay
                />
              ))}
            </List>
          </OverlayScrollbarsComponent>
          <div className={s.input}>
            <PlusCircleOutline />
          </div>
        </div>
      </SortableContext>

      {createPortal(
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeId != null ? (
            <Item
              value={items[activeIndex]}
              wrapperStyle={wrapperStyle({
                active: { id: activeId },
                index: activeIndex,
                isDragging: true,
                id: items[activeIndex],
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
}

export const SortableItem = ({ id, index, onRemove, isLastItem, useDragOverlay, wrapperStyle }: SortableItemProps) => {
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
      value={id}
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
