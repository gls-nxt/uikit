import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './sortableList.module.css';

export type SortableListContentProps = Prettify<
  HTMLAttributes<HTMLDivElement> & {
    'data-testid'?: string;
  }
>;

/**
 * Optional layout slot for the flexible middle of a row. It grows to fill the
 * space between leading content and the trailing handle. Purely presentational.
 */
export const SortableListContent = ({
  className,
  children,
  ...props
}: SortableListContentProps) => (
  <div className={cx(styles.sortableListContent, className)} {...props}>
    {children}
  </div>
);

SortableListContent.displayName = 'SortableListContent';
