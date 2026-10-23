import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { Popover } from '@components/popover';
import { SortableList } from '@components/sortableList';
import { ColumnsIcon } from '@icons';
import { cx } from 'class-variance-authority';
import { type ChangeEvent, useCallback } from 'react';

import styles from './tableColumnOrganiser.module.css';
import type {
  TableColumnOrganiserItem,
  TableColumnOrganiserProps,
} from './tableColumnOrganiser.types';
import { normalizeTableColumnOrder } from './tableColumnOrganiser.utils';

type OrganiserItemProps = {
  getReorderLabel: TableColumnOrganiserProps['getReorderLabel'];
  item: TableColumnOrganiserItem;
  name: string;
  onVisibilityChange: TableColumnOrganiserProps['onVisibilityChange'];
};

const OrganiserItem = ({ item, name, getReorderLabel, onVisibilityChange }: OrganiserItemProps) => {
  const handleVisibilityChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onVisibilityChange(item.id, event.currentTarget.checked);
    },
    [item.id, onVisibilityChange],
  );

  return (
    <SortableList.Item className={styles.item} disabled={item.reorderable === false} id={item.id}>
      <SortableList.Content>
        <Checkbox
          checked={item.visible}
          disabled={item.hideable === false}
          name={name}
          onChange={handleVisibilityChange}
          value={item.id}
        >
          {item.label}
        </Checkbox>
      </SortableList.Content>
      <SortableList.Handle label={getReorderLabel(item)} />
    </SortableList.Item>
  );
};

/**
 * Controlled UI for changing table-column visibility and order.
 *
 * Persistence, translations, analytics and table-specific column registries
 * intentionally remain with the consuming application.
 */
export const TableColumnOrganiser = ({
  items,
  triggerLabel,
  getReorderLabel,
  onReorder,
  onVisibilityChange,
  onReset,
  resetLabel,
  isModified = false,
  heading,
  emptyContent,
  name = 'table-columns',
  trigger,
  triggerClassName,
  panelClassName,
  panelStyle,
  open,
  defaultOpen,
  onOpenChange,
  align = 'end',
  side = 'bottom',
  sideOffset = 8,
}: TableColumnOrganiserProps) => {
  const itemIds = items.map((item) => item.id);

  const handleReorder = (requestedOrder: (string | number)[]) => {
    const nextOrder = normalizeTableColumnOrder(items, requestedOrder.map(String));
    const changed = nextOrder.some((id, index) => id !== itemIds[index]);

    if (changed) {
      onReorder(nextOrder);
    }
  };

  const defaultTrigger = (
    <Button
      className={triggerClassName}
      color="tertiary"
      size="sm"
      startIcon={<ColumnsIcon aria-hidden="true" />}
      type="button"
    >
      {triggerLabel}
    </Button>
  );

  return (
    <Popover
      align={align}
      aria-label={triggerLabel}
      arrowClassName={styles.arrow}
      className={cx(styles.panel, panelClassName)}
      defaultOpen={defaultOpen}
      heading={heading ? <div className={styles.heading}>{heading}</div> : undefined}
      onOpenChange={onOpenChange}
      open={open}
      side={side}
      sideOffset={sideOffset}
      style={panelStyle}
      trigger={trigger ?? defaultTrigger}
      width={null}
    >
      <div className={styles.body}>
        {items.length > 0 ? (
          <SortableList items={itemIds} onReorder={handleReorder}>
            {items.map((item) => (
              <OrganiserItem
                getReorderLabel={getReorderLabel}
                item={item}
                key={item.id}
                name={name}
                onVisibilityChange={onVisibilityChange}
              />
            ))}
          </SortableList>
        ) : (
          emptyContent
        )}
      </div>
      {onReset && resetLabel && isModified ? (
        <div className={styles.footer}>
          <Button
            className={styles.resetButton}
            color="tertiary"
            fullWidth
            onClick={onReset}
            size="sm"
            type="button"
          >
            {resetLabel}
          </Button>
        </div>
      ) : null}
    </Popover>
  );
};

TableColumnOrganiser.displayName = 'TableColumnOrganiser';

export default TableColumnOrganiser;
