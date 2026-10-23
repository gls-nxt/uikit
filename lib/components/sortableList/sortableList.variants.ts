import { cva, type VariantProps } from 'class-variance-authority';

import styles from './sortableList.module.css';

export const sortableListVariants = cva(styles.sortableList, {
  defaultVariants: {
    divided: false,
  },
  variants: {
    divided: {
      false: null,
      true: styles['sortableList--divided'],
    },
  },
});

export const sortableListItemVariants = cva(styles.sortableListItem, {
  defaultVariants: {
    dragging: false,
  },
  variants: {
    dragging: {
      false: null,
      true: styles['sortableListItem--dragging'],
    },
  },
});

export const sortableListHandleVariants = cva(styles.sortableListHandle);

export type SortableListVariants = VariantProps<typeof sortableListVariants>;
export type SortableListItemVariants = VariantProps<typeof sortableListItemVariants>;
export type SortableListHandleVariants = VariantProps<typeof sortableListHandleVariants>;
