// biome-ignore-all lint/a11y/noRedundantRoles: Grid and block display overrides can strip native table roles from accessibility trees.
import { Spinner } from '@components/spinner';
import { cx } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

import styles from './table.module.css';
import type { TableProps } from './table.types';
import { TableBody } from './tableBody';
import { TableHeader } from './tableHeader';

type TableStateRowProps = {
  columnCount: number;
  content: ReactNode;
};

const TableStateRow = ({ columnCount, content }: TableStateRowProps) => (
  <tbody className={styles.body} role="rowgroup">
    <tr role="row">
      <td aria-colspan={columnCount} className={styles.stateCell} colSpan={columnCount} role="cell">
        {content}
      </td>
    </tr>
  </tbody>
);

/**
 * Generic, accessible data table with controlled sorting.
 *
 * The component deliberately owns no routing, translation, analytics or data
 * fetching. Consumers provide already-localized headers and persist the sort
 * state wherever their platform requires.
 */
export const Table = <TRow,>({
  columns,
  data,
  getRowId,
  sort,
  onSortChange,
  getSortDescription,
  isLoading = false,
  loadingContent,
  emptyContent,
  showNavigationArrow = false,
  navigationIndicator,
  defaultColumnSize = 'minmax(max-content, 1fr)',
  columnTemplate,
  navigationColumnSize = '60px',
  containerClassName,
  containerProps,
  rowClassName,
  getRowProps,
  renderRowAction,
  className,
  ref,
  style,
  ...props
}: TableProps<TRow>) => {
  const columnCount = columns.length + (showNavigationArrow ? 1 : 0);
  const resolvedColumnTemplate =
    columnTemplate ?? columns.map((column) => column.size ?? defaultColumnSize).join(' ');
  const tableStyle = {
    '--table-column-template': resolvedColumnTemplate || defaultColumnSize,
    '--table-navigation-column-width': navigationColumnSize,
    ...style,
  } as CSSProperties;

  let body: ReactNode;
  if (isLoading) {
    body = (
      <TableStateRow
        columnCount={columnCount}
        content={loadingContent ?? <Spinner aria-hidden="true" size="lg" testId="table-spinner" />}
      />
    );
  } else if (data.length === 0 && emptyContent !== undefined) {
    body = <TableStateRow columnCount={columnCount} content={emptyContent} />;
  } else {
    body = (
      <TableBody
        columns={columns}
        data={data}
        getRowId={getRowId}
        getRowProps={getRowProps}
        hasNavigationArrow={showNavigationArrow}
        navigationIndicator={navigationIndicator}
        renderRowAction={renderRowAction}
        rowClassName={rowClassName}
      />
    );
  }

  return (
    <div {...containerProps} className={cx(styles.container, containerClassName)}>
      <table
        {...props}
        aria-busy={isLoading}
        className={cx(styles.table, showNavigationArrow && styles.tableWithNavigation, className)}
        ref={ref}
        role="table"
        style={tableStyle}
      >
        <TableHeader
          columns={columns}
          getSortDescription={getSortDescription}
          hasNavigationColumn={showNavigationArrow}
          onSortChange={onSortChange}
          sort={sort}
        />
        {body}
      </table>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
