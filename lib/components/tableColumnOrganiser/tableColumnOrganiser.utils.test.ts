import { describe, expect, it } from 'vitest';

import type { TableColumnOrganiserItem } from './tableColumnOrganiser.types';
import { normalizeTableColumnOrder } from './tableColumnOrganiser.utils';

const items: TableColumnOrganiserItem[] = [
  { id: 'name', label: 'Name', reorderable: false, visible: true },
  { id: 'address', label: 'Address', visible: true },
  { id: 'status', label: 'Status', visible: false },
];

describe('normalizeTableColumnOrder', () => {
  it('applies the requested relative order', () => {
    expect(normalizeTableColumnOrder(items, ['name', 'status', 'address'])).toEqual([
      'name',
      'status',
      'address',
    ]);
  });

  it('keeps non-reorderable columns at their current indexes', () => {
    expect(normalizeTableColumnOrder(items, ['status', 'name', 'address'])).toEqual([
      'name',
      'status',
      'address',
    ]);
  });

  it('drops unknown and duplicate ids and appends missing columns', () => {
    expect(normalizeTableColumnOrder(items, ['unknown', 'status', 'status'])).toEqual([
      'name',
      'status',
      'address',
    ]);
  });
});
