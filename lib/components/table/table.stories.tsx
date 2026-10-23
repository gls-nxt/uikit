import { Badge } from '@components/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Table } from './table';
import type { TableColumnDef, TableSortState } from './table.types';

type User = {
  email: string;
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
};

const users: User[] = [
  { email: 'ada@example.com', id: '1', name: 'Ada Lovelace', role: 'Admin', status: 'active' },
  { email: 'grace@example.com', id: '2', name: 'Grace Hopper', role: 'Editor', status: 'active' },
  { email: 'alan@example.com', id: '3', name: 'Alan Turing', role: 'Viewer', status: 'pending' },
];

const statusColors = {
  active: 'green',
  inactive: 'red',
  pending: 'orange',
} as const;

const columns: TableColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  { accessorKey: 'email', header: 'Email', sortable: true },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'status',
    cell: ({ value }) => (
      <Badge color={statusColors[value]} size="sm">
        {String(value)}
      </Badge>
    ),
    header: 'Status',
  },
];

const meta = {
  args: {
    'aria-label': 'Users',
    columns,
    data: users,
    getRowId: (row: User) => row.id,
  },
  component: Table<User>,
  parameters: {
    docs: {
      description: {
        component:
          'A generic data table with custom cells, loading and empty states, and controlled three-state sorting. Routing, translations and data fetching remain the responsibility of the consuming application.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Table',
} satisfies Meta<typeof Table<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const SortableExample = () => {
  const [sort, setSort] = useState<TableSortState>();
  const sortedUsers = [...users];

  if (sort) {
    sortedUsers.sort((left, right) => {
      const leftValue = String(left[sort.columnId as keyof User]);
      const rightValue = String(right[sort.columnId as keyof User]);
      const result = leftValue.localeCompare(rightValue);
      return sort.direction === 'ascending' ? result : -result;
    });
  }

  return (
    <Table
      aria-label="Sortable users"
      columns={columns}
      data={sortedUsers}
      getRowId={(row) => row.id}
      getSortDescription={(column, nextSort) => {
        const action = nextSort ? `Sort ${nextSort.direction}` : 'Clear sorting';
        return `${action} for ${String(column.header)}`;
      }}
      onSortChange={setSort}
      sort={sort}
    />
  );
};

export const Sortable: Story = {
  render: () => <SortableExample />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyContent: 'No users found.',
  },
};

export const WithNavigationIndicator: Story = {
  args: {
    showNavigationArrow: true,
  },
};
