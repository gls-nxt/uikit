import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { action } from 'storybook/actions';
import { SortableList } from './sortableList';
import type { SortableListRootProps } from './sortableListRoot';

const meta = {
  args: {
    items: [],
    onReorder: () => {},
  },
  argTypes: {
    divided: {
      control: 'boolean',
      description: 'Render a divider line between rows.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    items: {
      control: false,
      description: 'Ordered list of item ids. Must match each `SortableList.Item` id.',
      table: { type: { summary: 'UniqueIdentifier[]' } },
    },
    onReorder: {
      control: false,
      description: 'Called with the reordered ids when a drag changes the order.',
      table: { category: 'Events', type: { summary: '(items, meta) => void' } },
    },
  },
  component: SortableList,
  parameters: {
    docs: {
      description: {
        component:
          'A drag-and-drop sortable list built on dnd-kit `useSortable`. Compose it from `SortableList.Item`, `SortableList.Content` and `SortableList.Handle`. Only the handle starts a drag, but the whole item moves. Try keyboard reordering: focus a handle, press Space, use the arrow keys, then Space again.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/SortableList',
} satisfies Meta<typeof SortableList>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default — plain text rows                                                  */
/* -------------------------------------------------------------------------- */

const SIMPLE_ITEMS = ['Address', 'Depot & Regions', 'Carrier Status', 'Provider Status'];

const DefaultExample = (args: { divided?: boolean }) => {
  const [items, setItems] = useState<UniqueIdentifier[]>(SIMPLE_ITEMS);

  const handleReorder = useCallback(
    (
      next: UniqueIdentifier[],
      meta: Parameters<NonNullable<SortableListRootProps['onReorder']>>[1],
    ) => {
      setItems(next);
      action('onReorder')(next, meta);
    },
    [],
  );

  return (
    <SortableList
      divided={args.divided}
      items={items}
      onReorder={handleReorder}
      style={{ width: 320 }}
    >
      {items.map((id) => (
        <SortableList.Item id={id} key={id}>
          <SortableList.Content>{id}</SortableList.Content>
          <SortableList.Handle label={`Reorder ${id}`} />
        </SortableList.Item>
      ))}
    </SortableList>
  );
};

export const Default: Story = {
  args: { divided: false },
  render: (args) => <DefaultExample divided={args.divided ?? false} />,
};

/* -------------------------------------------------------------------------- */
/* Custom handle content                                                      */
/* -------------------------------------------------------------------------- */

const CustomHandleExample = () => {
  const [items, setItems] = useState<UniqueIdentifier[]>(SIMPLE_ITEMS);

  return (
    <SortableList divided items={items} onReorder={setItems} style={{ width: 320 }}>
      {items.map((id) => (
        <SortableList.Item id={id} key={id}>
          <SortableList.Content>{id}</SortableList.Content>
          <SortableList.Handle label={`Reorder ${id}`}>☰</SortableList.Handle>
        </SortableList.Item>
      ))}
    </SortableList>
  );
};

export const CustomHandle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `children` to `SortableList.Handle` to use any icon or glyph as the grip.',
      },
    },
  },
  render: () => <CustomHandleExample />,
};
