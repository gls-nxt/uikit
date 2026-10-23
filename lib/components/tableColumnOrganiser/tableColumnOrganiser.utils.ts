import type { TableColumnOrganiserItem } from './tableColumnOrganiser.types';

/**
 * Keeps non-reorderable columns at their current indexes while applying the
 * relative order requested for every other column.
 */
export const normalizeTableColumnOrder = (
  items: readonly TableColumnOrganiserItem[],
  requestedOrder: readonly string[],
) => {
  const itemById = new Map(items.map((item) => [item.id, item]));
  const seen = new Set<string>();
  const reorderableIds: string[] = [];

  for (const id of requestedOrder) {
    const item = itemById.get(id);
    if (item && item.reorderable !== false && !seen.has(id)) {
      reorderableIds.push(id);
      seen.add(id);
    }
  }

  for (const item of items) {
    if (item.reorderable !== false && !seen.has(item.id)) {
      reorderableIds.push(item.id);
    }
  }

  let reorderableIndex = 0;
  return items.map((item) => {
    if (item.reorderable === false) {
      return item.id;
    }

    const id = reorderableIds[reorderableIndex];
    reorderableIndex += 1;
    return id;
  });
};
