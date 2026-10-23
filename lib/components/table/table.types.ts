import type { Prettify } from '@utils/types';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react';

export type TableSortDirection = 'ascending' | 'descending';

export type TableSortState = {
  columnId: string;
  direction: TableSortDirection;
};

export type TableRowContext<TRow> = {
  index: number;
  original: TRow;
};

export type TableCellContext<TRow, TValue = unknown> = {
  row: TableRowContext<TRow>;
  value: TValue;
};

export type TableRowActionContext<TRow> = TableRowContext<TRow> & {
  /** Apply this class to the rendered link or button to make it cover the row. */
  className: string;
};

export type TableRowAttributes = Omit<ComponentPropsWithoutRef<'tr'>, 'children' | 'className'> & {
  className?: string;
  [attribute: `data-${string}`]: string | number | boolean | undefined;
};

type TableColumnBase<TRow, TValue> = {
  /** Content rendered in the column header. */
  header: ReactNode;
  /**
   * Render custom cell content. `value` is inferred from `accessorKey`, or is
   * `undefined` for an id-only column. Falls back to the accessor value.
   */
  cell?: (context: TableCellContext<TRow, TValue>) => ReactNode;
  /** Apply a class to every body cell in this column. */
  cellClassName?: string;
  /** Apply a class to this column's header cell. */
  headerClassName?: string;
  /** Enables the controlled sort interaction for this column. */
  sortable?: boolean;
  /**
   * CSS grid track size, for example `12rem`, `1fr` or
   * `minmax(16rem, 2fr)`. Falls back to `defaultColumnSize`.
   */
  size?: string;
};

type TableColumnWithId<TRow> = TableColumnBase<TRow, undefined> & {
  id: string;
  accessorKey?: never;
};

type TableAccessorKey<TRow> = Extract<keyof TRow, string>;

type TableColumnWithAccessor<TRow, TKey extends TableAccessorKey<TRow>> = TableColumnBase<
  TRow,
  TRow[TKey]
> & {
  id?: string;
  accessorKey: TKey;
};

type TableColumnWithAnyAccessor<TRow> = {
  [TKey in TableAccessorKey<TRow>]: Prettify<TableColumnWithAccessor<TRow, TKey>>;
}[TableAccessorKey<TRow>];

/**
 * Data-driven column definition. Every column must have either an explicit
 * `id` or an `accessorKey`, which is also used as its id when `id` is omitted.
 */
export type TableColumnDef<TRow> =
  | Prettify<TableColumnWithId<TRow>>
  | TableColumnWithAnyAccessor<TRow>;

export type TableProps<TRow> = Prettify<
  Omit<ComponentPropsWithRef<'table'>, 'children'> & {
    /** Column definitions in their rendered order. */
    columns: readonly TableColumnDef<TRow>[];
    /** Rows to render. */
    data: readonly TRow[];
    /** Stable row key resolver. */
    getRowId: (row: TRow, index: number) => string | number;
    /** Current controlled sort state. */
    sort?: TableSortState;
    /** Called with the next state: ascending, descending, then undefined. */
    onSortChange?: (sort: TableSortState | undefined) => void;
    /**
     * Optional localized description of the next sort action. The returned
     * text is visually hidden and associated with the sortable header button
     * as its accessible description.
     */
    getSortDescription?: (
      column: TableColumnDef<TRow>,
      nextSort: TableSortState | undefined,
    ) => string;
    /** Whether data is loading. */
    isLoading?: boolean;
    /** Content shown while loading. Defaults to the UI-kit Spinner. */
    loadingContent?: ReactNode;
    /** Content shown when `data` is empty. An empty body is rendered when omitted. */
    emptyContent?: ReactNode;
    /** Add a decorative navigation indicator column to each row. */
    showNavigationArrow?: boolean;
    /** Override the default navigation indicator. */
    navigationIndicator?: ReactNode;
    /** CSS grid track size used when a column has no explicit `size`. */
    defaultColumnSize?: string;
    /**
     * Override the complete data-column grid template. When supplied, this
     * takes precedence over column `size` values.
     */
    columnTemplate?: string;
    /** CSS grid track size for the optional navigation-indicator column. */
    navigationColumnSize?: string;
    /** Class applied to the scroll container around the table. */
    containerClassName?: string;
    /** Additional props for the scroll container. */
    containerProps?: Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;
    /** Class applied to every row, or resolved per row. */
    rowClassName?: string | ((context: TableRowContext<TRow>) => string | undefined);
    /**
     * Additional native attributes resolved for each row. Use
     * `renderRowAction` for the row's primary interactive control.
     */
    getRowProps?: (context: TableRowContext<TRow>) => TableRowAttributes;
    /**
     * Render an accessible full-row link or button. The consuming platform
     * owns navigation and analytics and must apply the provided `className`.
     * Native interactive descendants render above the full-row action; add
     * `data-table-interactive` to any custom interactive descendant.
     */
    renderRowAction?: (context: TableRowActionContext<TRow>) => ReactNode;
  }
>;
