import { describe, expect, it } from 'vitest';

import type { TableColumnDef } from './table.types';
import { getNextTableSort, getTableColumnId } from './table.utils';

type TestRow = {
  email: string;
  name: string;
};

describe('table utilities', () => {
  describe('getTableColumnId', () => {
    it('prefers an explicit id', () => {
      const column: TableColumnDef<TestRow> = {
        accessorKey: 'name',
        header: 'Name',
        id: 'display-name',
      };

      expect(getTableColumnId(column)).toBe('display-name');
    });

    it('falls back to the accessor key', () => {
      const column: TableColumnDef<TestRow> = { accessorKey: 'email', header: 'Email' };

      expect(getTableColumnId(column)).toBe('email');
    });
  });

  describe('getNextTableSort', () => {
    it('starts with ascending', () => {
      expect(getNextTableSort('name')).toEqual({ columnId: 'name', direction: 'ascending' });
    });

    it('moves from ascending to descending', () => {
      expect(getNextTableSort('name', { columnId: 'name', direction: 'ascending' })).toEqual({
        columnId: 'name',
        direction: 'descending',
      });
    });

    it('clears descending sort', () => {
      expect(
        getNextTableSort('name', { columnId: 'name', direction: 'descending' }),
      ).toBeUndefined();
    });

    it('starts ascending when a different column is selected', () => {
      expect(getNextTableSort('email', { columnId: 'name', direction: 'descending' })).toEqual({
        columnId: 'email',
        direction: 'ascending',
      });
    });
  });
});
