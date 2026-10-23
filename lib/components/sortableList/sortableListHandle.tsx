import { GripVerticalIcon } from '@icons';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './sortableList.module.css';
import { sortableListHandleVariants } from './sortableList.variants';
import { useSortableItemContext } from './sortableListContext';

export type SortableListHandleProps = Prettify<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    /**
     * Accessible label for the drag handle. Read out by screen readers and
     * used as the tooltip.
     */
    label: string;
    /** Custom handle content (e.g. a different icon). Defaults to a 6-dot glyph. */
    children?: ReactNode;
    'data-testid'?: string;
  }
>;

export const SortableListHandle = ({
  label,
  className,
  children,
  ...props
}: SortableListHandleProps) => {
  const { attributes, listeners, setActivatorNodeRef, disabled } = useSortableItemContext();

  return (
    <button
      aria-label={label}
      className={cx(sortableListHandleVariants(), className)}
      ref={setActivatorNodeRef}
      title={label}
      type="button"
      {...props}
      {...attributes}
      {...listeners}
      disabled={disabled || props.disabled}
    >
      {children ?? (
        <GripVerticalIcon aria-hidden="true" className={styles.sortableListHandleIcon} />
      )}
    </button>
  );
};

SortableListHandle.displayName = 'SortableListHandle';
