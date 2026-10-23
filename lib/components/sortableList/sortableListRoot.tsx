import {
  type CollisionDetection,
  closestCenter,
  DndContext,
  type DndContextProps,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  type SortableContextProps,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { type SortableListVariants, sortableListVariants } from './sortableList.variants';

export type SortableReorderMeta = {
  /** The id of the item that was dragged. */
  activeId: UniqueIdentifier;
  /** The id of the item it was dropped over. */
  overId: UniqueIdentifier;
  /** Index of the item before the move. */
  oldIndex: number;
  /** Index of the item after the move. */
  newIndex: number;
};

export type SortableListRootProps = Prettify<
  Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> &
    SortableListVariants & {
      /**
       * The ordered list of item ids. Must match the `id` of each
       * `SortableList.Item` rendered as a child, in render order.
       */
      items: UniqueIdentifier[];
      /**
       * Called when the user finishes a drag that changes the order. Receives
       * the reordered list of ids plus metadata about the move.
       */
      onReorder: (items: UniqueIdentifier[], meta: SortableReorderMeta) => void;
      /** Strategy passed to dnd-kit's `SortableContext`. Defaults to a vertical list. */
      strategy?: SortableContextProps['strategy'];
      /** Collision detection algorithm. Defaults to `closestCenter`. */
      collisionDetection?: CollisionDetection;
      /** Extra props forwarded to the underlying dnd-kit `DndContext`. */
      dndContextProps?: Omit<DndContextProps, 'sensors' | 'collisionDetection' | 'onDragEnd'>;
      'data-testid'?: string;
    }
>;

export const SortableListRoot = ({
  items,
  onReorder,
  divided = false,
  strategy = verticalListSortingStrategy,
  collisionDetection = closestCenter,
  dndContextProps,
  className,
  children,
  ...props
}: SortableListRootProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd: DndContextProps['onDragEnd'] = (event) => {
    const { active, over } = event;

    if (over === null || active.id === over.id) {
      return;
    }

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onReorder(arrayMove(items, oldIndex, newIndex), {
      activeId: active.id,
      newIndex,
      oldIndex,
      overId: over.id,
    });
  };

  return (
    <DndContext
      {...dndContextProps}
      collisionDetection={collisionDetection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={items} strategy={strategy}>
        <ul className={cx(sortableListVariants({ divided }), className)} {...props}>
          {children}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

SortableListRoot.displayName = 'SortableListRoot';
