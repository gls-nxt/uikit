import type { useSortable } from '@dnd-kit/sortable';
import { createContext, useContext } from 'react';

/**
 * The subset of the `useSortable` return value that the handle needs in order
 * to act as the drag activator. Sharing it through context is what lets the
 * handle be the only drag trigger while the whole item is the thing that moves.
 */
export type SortableItemContextValue = Pick<
  ReturnType<typeof useSortable>,
  'attributes' | 'listeners' | 'setActivatorNodeRef' | 'isDragging'
> & {
  disabled: boolean;
};

export const SortableItemContext = createContext<SortableItemContextValue | null>(null);

export const useSortableItemContext = () => {
  const context = useContext(SortableItemContext);

  if (context === null) {
    throw new Error('SortableList.Handle must be rendered inside a SortableList.Item.');
  }

  return context;
};
