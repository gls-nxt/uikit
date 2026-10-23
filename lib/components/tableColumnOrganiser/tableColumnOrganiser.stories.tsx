import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { Table } from '../table';
import type { TableColumnDef } from '../table/table.types';
import { getTableColumnId } from '../table/table.utils';
import { TableColumnOrganiser } from './tableColumnOrganiser';
import type { TableColumnOrganiserItem } from './tableColumnOrganiser.types';

const initialItems: TableColumnOrganiserItem[] = [
  {
    hideable: false,
    id: 'lockerName',
    label: 'Locker name',
    reorderable: false,
    visible: true,
  },
  { id: 'address', label: 'Address', visible: true },
  { id: 'carrierStatus', label: 'Carrier status', visible: true },
  { id: 'providerStatus', label: 'Provider status', visible: false },
  { id: 'availableCompartments', label: 'Available compartments', visible: true },
];

const OrganiserExample = () => {
  const [items, setItems] = useState(initialItems);

  const handleReorder = useCallback((orderedIds: string[]) => {
    setItems((current) =>
      orderedIds.flatMap((id) => {
        const item = current.find((candidate) => candidate.id === id);
        return item ? [item] : [];
      }),
    );
  }, []);

  const handleVisibilityChange = useCallback((id: string, visible: boolean) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, visible } : item)));
  }, []);

  const handleReset = useCallback(() => setItems(initialItems), []);
  const isModified = items.some(
    (item, index) =>
      item.id !== initialItems[index]?.id || item.visible !== initialItems[index]?.visible,
  );

  return (
    <TableColumnOrganiser
      getReorderLabel={(item) => `Reorder ${item.label}`}
      heading="Table columns"
      isModified={isModified}
      items={items}
      onReorder={handleReorder}
      onReset={handleReset}
      onVisibilityChange={handleVisibilityChange}
      resetLabel="Reset to default"
      triggerLabel="Columns"
    />
  );
};

const meta = {
  args: {
    getReorderLabel: (item) => `Reorder ${item.label}`,
    items: initialItems,
    onReorder: () => {},
    onVisibilityChange: () => {},
    triggerLabel: 'Columns',
  },
  component: TableColumnOrganiser,
  parameters: {
    docs: {
      description: {
        component:
          'A controlled table-column organizer for changing visibility and order. Consumers own localization, persistence, analytics and the canonical column registry.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/TableColumnOrganiser',
} satisfies Meta<typeof TableColumnOrganiser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <OrganiserExample />,
};

export const Empty: Story = {
  args: {
    emptyContent: 'No configurable columns.',
    getReorderLabel: (item) => `Reorder ${item.label}`,
    items: [],
    onReorder: () => {},
    onVisibilityChange: () => {},
    triggerLabel: 'Columns',
  },
};

type Locker = {
  address: string;
  availableCompartments: number;
  carrierStatus: string;
  id: string;
  lockerName: string;
  providerStatus: string;
};

const lockers: Locker[] = [
  {
    address: 'Waldstraße 1, Köln',
    availableCompartments: 12,
    carrierStatus: 'Active',
    id: 'locker-1',
    lockerName: 'DE201',
    providerStatus: 'Online',
  },
  {
    address: 'Ringstraße 68, Essen',
    availableCompartments: 4,
    carrierStatus: 'Active',
    id: 'locker-2',
    lockerName: 'DE202',
    providerStatus: 'Maintenance',
  },
];

const lockerColumns: TableColumnDef<Locker>[] = [
  { accessorKey: 'lockerName', header: 'Locker name', size: 'minmax(10rem, 1fr)' },
  { accessorKey: 'address', header: 'Address', size: 'minmax(16rem, 2fr)' },
  { accessorKey: 'carrierStatus', header: 'Carrier status', size: '10rem' },
  { accessorKey: 'providerStatus', header: 'Provider status', size: '10rem' },
  {
    accessorKey: 'availableCompartments',
    header: 'Available compartments',
    size: '12rem',
  },
];

const TableWithOrganiserExample = () => {
  const [items, setItems] = useState(initialItems);

  const handleReorder = useCallback((orderedIds: string[]) => {
    setItems((current) =>
      orderedIds.flatMap((id) => {
        const item = current.find((candidate) => candidate.id === id);
        return item ? [item] : [];
      }),
    );
  }, []);

  const handleVisibilityChange = useCallback((id: string, visible: boolean) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, visible } : item)));
  }, []);

  const handleReset = useCallback(() => setItems(initialItems), []);
  const isModified = items.some(
    (item, index) =>
      item.id !== initialItems[index]?.id || item.visible !== initialItems[index]?.visible,
  );
  const columnById = new Map(lockerColumns.map((column) => [getTableColumnId(column), column]));
  const visibleColumns = items.flatMap((item) => {
    const column = columnById.get(item.id);
    return item.visible && column ? [column] : [];
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ alignSelf: 'flex-end' }}>
        <TableColumnOrganiser
          getReorderLabel={(item) => `Reorder ${item.label}`}
          heading="Table columns"
          isModified={isModified}
          items={items}
          onReorder={handleReorder}
          onReset={handleReset}
          onVisibilityChange={handleVisibilityChange}
          resetLabel="Reset to default"
          triggerLabel="Columns"
        />
      </div>
      <Table
        aria-label="Lockers"
        columns={visibleColumns}
        data={lockers}
        getRowId={(locker) => locker.id}
        getRowProps={({ original }) => ({ 'data-locker-id': original.id })}
        renderRowAction={({ className, original }) => (
          <a
            aria-label={`Open ${original.lockerName}`}
            className={className}
            href={`#${original.id}`}
          >
            <VisuallyHidden>Open {original.lockerName}</VisuallyHidden>
          </a>
        )}
        showNavigationArrow
      />
    </div>
  );
};

export const WithTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The organizer controls the same column ids consumed by Table. Reordering or toggling a column immediately updates the rendered table; persistence remains the application’s responsibility.',
      },
    },
  },
  render: () => <TableWithOrganiserExample />,
};
