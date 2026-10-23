// biome-ignore-all lint/a11y/noRedundantRoles: Grid and block display overrides can strip native table roles from accessibility trees.
import { ChevronDownIcon, ChevronUpIcon } from '@icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cx } from 'class-variance-authority';
import { useId } from 'react';

import styles from './table.module.css';
import type { TableColumnDef, TableProps, TableSortState } from './table.types';
import { getNextTableSort, getTableColumnId } from './table.utils';

type TableHeaderProps<TRow> = Pick<
  TableProps<TRow>,
  'columns' | 'getSortDescription' | 'onSortChange' | 'sort'
> & {
  hasNavigationColumn: boolean;
};

type TableHeaderCellProps<TRow> = Pick<
  TableProps<TRow>,
  'getSortDescription' | 'onSortChange' | 'sort'
> & {
  column: TableColumnDef<TRow>;
};

const SortIndicator = ({ direction }: { direction: TableSortState['direction'] }) => {
  const Icon = direction === 'ascending' ? ChevronUpIcon : ChevronDownIcon;
  return <Icon aria-hidden="true" className={styles.sortIndicator} size="sm" />;
};

const getSortHeaderState = <TRow,>(
  column: TableColumnDef<TRow>,
  sort: TableSortState | undefined,
  onSortChange: TableProps<TRow>['onSortChange'],
  getSortDescription: TableProps<TRow>['getSortDescription'],
) => {
  const columnId = getTableColumnId(column);
  const isSortable = Boolean(column.sortable);
  const isInteractive = isSortable && Boolean(onSortChange);
  const isSorted = isSortable && sort?.columnId === columnId;
  const nextSort = isInteractive ? getNextTableSort(columnId, sort) : undefined;
  let ariaSort: TableSortState['direction'] | 'none' | undefined;

  if (isSortable) {
    ariaSort = isSorted && sort ? sort.direction : 'none';
  }

  return {
    ariaSort,
    isInteractive,
    isSorted,
    nextSort,
    sortDescription: isInteractive ? getSortDescription?.(column, nextSort) : undefined,
  } as const;
};

const TableHeaderCell = <TRow,>({
  column,
  sort,
  onSortChange,
  getSortDescription,
}: TableHeaderCellProps<TRow>) => {
  const sortDescriptionId = useId();
  const { ariaSort, isInteractive, isSorted, nextSort, sortDescription } = getSortHeaderState(
    column,
    sort,
    onSortChange,
    getSortDescription,
  );

  const handleSort = () => {
    onSortChange?.(nextSort);
  };

  return (
    <th
      aria-sort={ariaSort}
      className={cx(
        styles.headerCell,
        isInteractive && styles.sortableHeader,
        column.headerClassName,
      )}
      role="columnheader"
      scope="col"
    >
      {isInteractive ? (
        <>
          <button
            aria-describedby={sortDescription ? sortDescriptionId : undefined}
            className={styles.headerContent}
            onClick={handleSort}
            type="button"
          >
            <span className={styles.headerLabel}>{column.header}</span>
            {isSorted && sort ? <SortIndicator direction={sort.direction} /> : null}
          </button>
          {sortDescription ? (
            <VisuallyHidden id={sortDescriptionId}>{sortDescription}</VisuallyHidden>
          ) : null}
        </>
      ) : (
        <div className={styles.headerContent}>
          <span className={styles.headerLabel}>{column.header}</span>
          {isSorted && sort ? <SortIndicator direction={sort.direction} /> : null}
        </div>
      )}
    </th>
  );
};

export const TableHeader = <TRow,>({
  columns,
  hasNavigationColumn,
  sort,
  onSortChange,
  getSortDescription,
}: TableHeaderProps<TRow>) => (
  <thead role="rowgroup">
    <tr role="row">
      {columns.map((column) => (
        <TableHeaderCell
          column={column}
          getSortDescription={getSortDescription}
          key={getTableColumnId(column)}
          onSortChange={onSortChange}
          sort={sort}
        />
      ))}
      {hasNavigationColumn ? (
        // biome-ignore lint/a11y/noAriaHiddenOnFocusable: This th is not focusable, and its matching indicator cells are decorative.
        <th
          aria-hidden="true"
          className={cx(styles.headerCell, styles.navigationHeader)}
          role="columnheader"
          scope="col"
        />
      ) : null}
    </tr>
  </thead>
);

TableHeader.displayName = 'TableHeader';
