export { SortableListContent, type SortableListContentProps } from './sortableListContent';
export { SortableListHandle, type SortableListHandleProps } from './sortableListHandle';
export { SortableListItem, type SortableListItemProps } from './sortableListItem';
export {
  SortableListRoot,
  type SortableListRootProps,
  type SortableReorderMeta,
} from './sortableListRoot';

import { SortableListContent } from './sortableListContent';
import { SortableListHandle } from './sortableListHandle';
import { SortableListItem } from './sortableListItem';
import { SortableListRoot, type SortableListRootProps } from './sortableListRoot';

export type SortableListProps = SortableListRootProps;

/**
 * A drag-and-drop sortable list built on dnd-kit's `useSortable`.
 *
 * Compose it from its slots — the list is content-agnostic, so it works for
 * many designs:
 *
 * ```tsx
 * <SortableList items={ids} onReorder={setIds}>
 *   {rows.map((row) => (
 *     <SortableList.Item key={row.id} id={row.id} disabled={row.pinned}>
 *       <Checkbox checked={row.checked} onChange={...}>{row.label}</Checkbox>
 *       <SortableList.Content />
 *       {row.pinned ? <Lock /> : <SortableList.Handle />}
 *     </SortableList.Item>
 *   ))}
 * </SortableList>
 * ```
 *
 * Only `SortableList.Handle` triggers a drag, but the whole `SortableList.Item`
 * is what moves.
 */
export const SortableList = Object.assign(SortableListRoot, {
  Content: SortableListContent,
  Handle: SortableListHandle,
  Item: SortableListItem,
  Root: SortableListRoot,
});

export default SortableList;
