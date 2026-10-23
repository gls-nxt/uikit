// biome-ignore-all lint/a11y/noRedundantRoles: Grid and block display overrides can strip native table roles from accessibility trees.
import { ChevronRightIcon } from '@icons';
import { cx } from 'class-variance-authority';
import type { ReactNode } from 'react';

import styles from './table.module.css';
import type { TableCellContext, TableColumnDef, TableProps, TableRowContext } from './table.types';
import { getTableColumnId } from './table.utils';

type TableBodyProps<TRow> = Pick<
  TableProps<TRow>,
  | 'columns'
  | 'data'
  | 'getRowId'
  | 'getRowProps'
  | 'navigationIndicator'
  | 'renderRowAction'
  | 'rowClassName'
> & {
  hasNavigationArrow: boolean;
};

type TableBodyRowProps<TRow> = Pick<
  TableProps<TRow>,
  'columns' | 'getRowProps' | 'navigationIndicator' | 'renderRowAction' | 'rowClassName'
> & {
  hasNavigationArrow: boolean;
  index: number;
  row: TRow;
};

const renderCellValue = <TRow,>(
  column: TableColumnDef<TRow>,
  row: TRow,
  index: number,
): ReactNode => {
  const value = column.accessorKey !== undefined ? row[column.accessorKey] : undefined;

  if (column.cell) {
    // The discriminated public column union guarantees that the accessor and
    // renderer value agree; this erases that union only inside the renderer.
    const renderCell = column.cell as (context: TableCellContext<TRow>) => ReactNode;
    return renderCell({ row: { index, original: row }, value });
  }

  return value === null || value === undefined ? null : String(value);
};

const TableRow = <TRow,>({
  columns,
  row,
  index,
  hasNavigationArrow,
  navigationIndicator,
  rowClassName,
  getRowProps,
  renderRowAction,
}: TableBodyRowProps<TRow>) => {
  const context: TableRowContext<TRow> = { index, original: row };
  const resolvedRowClassName =
    typeof rowClassName === 'function' ? rowClassName(context) : rowClassName;
  const { className: rowPropsClassName, ...rowProps } = getRowProps?.(context) ?? {};
  const rowAction = renderRowAction?.({ ...context, className: styles.rowAction });

  return (
    <tr
      {...rowProps}
      className={cx(
        styles.row,
        rowAction && styles.interactiveRow,
        resolvedRowClassName,
        rowPropsClassName,
      )}
      role="row"
    >
      {columns.map((column, columnIndex) => (
        <td
          className={cx(styles.cell, column.cellClassName)}
          key={getTableColumnId(column)}
          role="cell"
        >
          {columnIndex === 0 ? rowAction : null}
          {renderCellValue(column, row, index)}
        </td>
      ))}
      {hasNavigationArrow ? (
        <td aria-hidden="true" className={cx(styles.cell, styles.navigationCell)} role="cell">
          <span className={styles.navigationIndicator}>
            {navigationIndicator ?? <ChevronRightIcon aria-hidden="true" size="md" />}
          </span>
        </td>
      ) : null}
    </tr>
  );
};

export const TableBody = <TRow,>({
  columns,
  data,
  getRowId,
  hasNavigationArrow,
  navigationIndicator,
  rowClassName,
  getRowProps,
  renderRowAction,
}: TableBodyProps<TRow>) => (
  <tbody className={styles.body} role="rowgroup">
    {data.map((row, index) => (
      <TableRow
        columns={columns}
        getRowProps={getRowProps}
        hasNavigationArrow={hasNavigationArrow}
        index={index}
        key={getRowId(row, index)}
        navigationIndicator={navigationIndicator}
        renderRowAction={renderRowAction}
        row={row}
        rowClassName={rowClassName}
      />
    ))}
  </tbody>
);

TableBody.displayName = 'TableBody';
