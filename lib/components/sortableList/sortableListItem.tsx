import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import { type CSSProperties, type HTMLAttributes, useMemo } from 'react';

import { sortableListItemVariants } from './sortableList.variants';
import { SortableItemContext, type SortableItemContextValue } from './sortableListContext';

export type SortableListItemProps = Prettify<
  Omit<HTMLAttributes<HTMLLIElement>, 'id'> & {
    /** Stable, unique id for this item. Must appear in the root's `items` array. */
    id: UniqueIdentifier;
    /** Disable dragging for this item (e.g. a pinned row). Defaults to `false`. */
    disabled?: boolean;
    'data-testid'?: string;
  }
>;

export const SortableListItem = ({
  id,
  disabled = false,
  className,
  style,
  children,
  ...props
}: SortableListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ disabled, id });

  const itemStyle: CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const contextValue = useMemo<SortableItemContextValue>(
    () => ({ attributes, disabled, isDragging, listeners, setActivatorNodeRef }),
    [attributes, disabled, isDragging, listeners, setActivatorNodeRef],
  );

  return (
    <SortableItemContext.Provider value={contextValue}>
      <li
        className={cx(sortableListItemVariants({ dragging: isDragging }), className)}
        ref={setNodeRef}
        style={itemStyle}
        {...props}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  );
};

SortableListItem.displayName = 'SortableListItem';
