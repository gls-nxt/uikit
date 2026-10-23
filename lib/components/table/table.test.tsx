import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { createRef } from 'react';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import { Table } from './table';
import type { TableColumnDef, TableSortState } from './table.types';

type User = {
  email: string;
  id: string;
  name: string;
  status: 'active' | 'inactive';
};

const data: User[] = [
  { email: 'ada@example.com', id: '1', name: 'Ada', status: 'active' },
  { email: 'grace@example.com', id: '2', name: 'Grace', status: 'inactive' },
];

const columns: TableColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  { accessorKey: 'email', header: 'Email' },
];

const renderTable = (props?: {
  columns?: TableColumnDef<User>[];
  data?: User[];
  sort?: TableSortState;
  onSortChange?: (sort: TableSortState | undefined) => void;
}) =>
  render(
    <Table
      aria-label="Users"
      columns={props?.columns ?? columns}
      data={props?.data ?? data}
      getRowId={(row) => row.id}
      onSortChange={props?.onSortChange}
      sort={props?.sort}
    />,
  );

describe('Table', () => {
  it('renders accessible headers, rows and accessor values', () => {
    renderTable();

    const table = screen.getByRole('table', { name: 'Users' });

    expect(table).toHaveAttribute('role', 'table');
    expect(table.querySelector('thead')).toHaveAttribute('role', 'rowgroup');
    expect(table.querySelector('tbody')).toHaveAttribute('role', 'rowgroup');
    for (const row of table.querySelectorAll('tr')) {
      expect(row).toHaveAttribute('role', 'row');
    }
    for (const header of table.querySelectorAll('th')) {
      expect(header).toHaveAttribute('role', 'columnheader');
    }
    for (const cell of table.querySelectorAll('td')) {
      expect(cell).toHaveAttribute('role', 'cell');
    }
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'grace@example.com' })).toBeInTheDocument();
  });

  it('infers accessor values in custom cell renderers', () => {
    const typedColumns: TableColumnDef<User>[] = [
      {
        accessorKey: 'status',
        cell: ({ value }) => {
          expectTypeOf(value).toEqualTypeOf<User['status']>();
          return value;
        },
        header: 'Status',
        id: 'user-status',
      },
      {
        cell: ({ value }) => {
          expectTypeOf(value).toEqualTypeOf<undefined>();
          return value;
        },
        header: 'Actions',
        id: 'actions',
      },
    ];

    expect(typedColumns).toHaveLength(2);
  });

  it('renders custom cell content with the row context and accessor value', () => {
    const cell = vi.fn(({ row, value }) => `${row.index}:${row.original.id}:${String(value)}`);
    renderTable({
      columns: [{ accessorKey: 'status', cell, header: 'Status' }],
    });

    expect(screen.getByText('0:1:active')).toBeInTheDocument();
    expect(cell).toHaveBeenCalledWith({
      row: { index: 0, original: data[0] },
      value: 'active',
    });
  });

  it('applies table, container, header, cell and row classes', () => {
    render(
      <Table
        aria-label="Users"
        className="custom-table"
        columns={[
          {
            accessorKey: 'name',
            cellClassName: 'custom-cell',
            header: 'Name',
            headerClassName: 'custom-header',
          },
        ]}
        containerClassName="custom-container"
        data={data}
        getRowId={(row) => row.id}
        rowClassName={({ original }) => `row-${original.id}`}
      />,
    );

    expect(screen.getByRole('table')).toHaveClass('custom-table');
    expect(screen.getByRole('table').parentElement).toHaveClass('custom-container');
    expect(screen.getByRole('columnheader')).toHaveClass('custom-header');
    expect(screen.getAllByRole('cell')[0]).toHaveClass('custom-cell');
    expect(screen.getAllByRole('row')[1]).toHaveClass('row-1');
  });

  it('supports column-level sizing and table-level template overrides', () => {
    const { rerender } = render(
      <Table
        aria-label="Users"
        columns={[
          { accessorKey: 'name', header: 'Name', size: 'minmax(12rem, 2fr)' },
          { accessorKey: 'email', header: 'Email' },
        ]}
        data={data}
        defaultColumnSize="minmax(8rem, 1fr)"
        getRowId={(row) => row.id}
        navigationColumnSize="3rem"
        showNavigationArrow
      />,
    );

    expect(screen.getByRole('table')).toHaveStyle({
      '--table-column-template': 'minmax(12rem, 2fr) minmax(8rem, 1fr)',
      '--table-navigation-column-width': '3rem',
    });

    rerender(
      <Table
        aria-label="Users"
        columns={columns}
        columnTemplate="2fr minmax(16rem, 3fr)"
        data={data}
        getRowId={(row) => row.id}
      />,
    );

    expect(screen.getByRole('table')).toHaveStyle({
      '--table-column-template': '2fr minmax(16rem, 3fr)',
    });
  });

  it('supports row attributes and framework-neutral full-row actions', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        getRowProps={({ original }) => ({
          'aria-label': `User ${original.name}`,
          className: `user-${original.id}`,
          'data-user-id': original.id,
        })}
        renderRowAction={({ className, original }) => (
          <a
            aria-label={`Open ${original.name}`}
            className={className}
            href={`#user-${original.id}`}
            onClick={onOpen}
          >
            <VisuallyHidden>Open {original.name}</VisuallyHidden>
          </a>
        )}
      />,
    );

    const firstDataRow = screen.getAllByRole('row')[1];
    const firstRowAction = screen.getByRole('link', { name: 'Open Ada' });

    expect(firstDataRow).toHaveAttribute('aria-label', 'User Ada');
    expect(firstDataRow).toHaveAttribute('data-user-id', '1');
    expect(firstDataRow).toHaveClass('user-1');
    expect(firstRowAction).toHaveAttribute('href', '#user-1');
    expect(firstRowAction.className).not.toBe('');

    await user.click(firstRowAction);
    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('forwards table and container props and the table ref', () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table
        aria-label="Users"
        columns={columns}
        containerProps={{ id: 'users-table-wrapper' }}
        data={data}
        data-testid="users-table"
        getRowId={(row) => row.id}
        ref={ref}
      />,
    );

    expect(document.querySelector('#users-table-wrapper')).toContainElement(
      screen.getByTestId('users-table'),
    );
    expect(ref.current).toBe(screen.getByTestId('users-table'));
  });

  it('renders the default loading state and marks the table busy', () => {
    render(
      <Table
        aria-busy={false}
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        isLoading
      />,
    );

    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('table-spinner').closest('td')).toHaveAttribute('aria-colspan', '2');
    expect(screen.queryByRole('cell', { name: 'Ada' })).not.toBeInTheDocument();
  });

  it('renders custom loading and empty content', () => {
    const { rerender } = render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        isLoading
        loadingContent="Loading users"
      />,
    );

    expect(screen.getByText('Loading users')).toBeInTheDocument();

    rerender(
      <Table
        aria-label="Users"
        columns={columns}
        data={[]}
        emptyContent="No users"
        getRowId={(row) => row.id}
      />,
    );

    expect(screen.getByText('No users')).toBeInTheDocument();
  });

  it('renders an empty table body when no empty content is supplied', () => {
    renderTable({ data: [] });

    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.queryByRole('cell')).not.toBeInTheDocument();
  });

  it('emits ascending, descending and cleared controlled sort states', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const { rerender } = render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
      />,
    );
    const nameButton = screen.getByRole('button', { name: 'Name' });

    await user.click(nameButton);
    expect(onSortChange).toHaveBeenLastCalledWith({ columnId: 'name', direction: 'ascending' });

    rerender(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
        sort={{ columnId: 'name', direction: 'ascending' }}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Name' }));
    expect(onSortChange).toHaveBeenLastCalledWith({ columnId: 'name', direction: 'descending' });

    rerender(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
        sort={{ columnId: 'name', direction: 'descending' }}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Name' }));
    expect(onSortChange).toHaveBeenLastCalledWith(undefined);
  });

  it('sets aria-sort and supplies a localized description for the next action', () => {
    render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        getSortDescription={(_column, nextSort) =>
          nextSort?.direction === 'descending' ? 'Sort descending' : 'Change sorting'
        }
        onSortChange={vi.fn()}
        sort={{ columnId: 'name', direction: 'ascending' }}
      />,
    );

    const nameButton = screen.getByRole('button', { name: 'Name' });
    const sortDescription = screen.getByText('Sort descending');

    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    expect(nameButton).toHaveAccessibleName('Name');
    expect(nameButton).toHaveAccessibleDescription('Sort descending');
    expect(nameButton).toHaveAttribute('aria-describedby', sortDescription.id);
  });

  it('does not render a button for a sortable column without a change handler', () => {
    const getSortDescription = vi.fn(() => 'Sort ascending');
    render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        getSortDescription={getSortDescription}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Name' })).not.toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'none');
    expect(getSortDescription).not.toHaveBeenCalled();
  });

  it('adds a decorative navigation column with a customizable indicator', () => {
    render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        navigationIndicator={<span>Go</span>}
        showNavigationArrow
      />,
    );

    const navigationHeader = document.querySelector('th[aria-hidden="true"]');

    expect(screen.getAllByText('Go')).toHaveLength(2);
    expect(screen.getAllByText('Go')[0].closest('td')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(3);
    expect(navigationHeader).toHaveAttribute('role', 'columnheader');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Table
        aria-label="Users"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        onSortChange={vi.fn()}
        renderRowAction={({ className, original }) => (
          <a className={className} href={`#user-${original.id}`}>
            <VisuallyHidden>Open {original.name}</VisuallyHidden>
          </a>
        )}
        showNavigationArrow
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
