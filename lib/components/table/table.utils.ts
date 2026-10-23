import type { TableColumnDef, TableSortState } from './table.types';

export const getTableColumnId = <TRow>(column: TableColumnDef<TRow>): string => {
  const columnId = column.id ?? column.accessorKey;

  if (columnId === undefined) {
    throw new Error('A table column requires an id or accessorKey.');
  }

  return columnId;
};

export const getNextTableSort = (
  columnId: string,
  currentSort?: TableSortState,
): TableSortState | undefined => {
  if (currentSort?.columnId !== columnId) {
    return { columnId, direction: 'ascending' };
  }

  if (currentSort.direction === 'ascending') {
    return { columnId, direction: 'descending' };
  }

  return undefined;
};
