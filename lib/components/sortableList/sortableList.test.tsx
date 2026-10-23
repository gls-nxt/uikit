import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { SortableList } from './sortableList';

const renderList = (props?: { onReorder?: (items: unknown) => void; divided?: boolean }) =>
  render(
    <SortableList
      data-testid="list"
      divided={props?.divided}
      items={['a', 'b', 'c']}
      onReorder={props?.onReorder ?? vi.fn()}
    >
      <SortableList.Item data-testid="item-a" id="a">
        <SortableList.Content>Item A</SortableList.Content>
        <SortableList.Handle label="Reorder Item A" />
      </SortableList.Item>
      <SortableList.Item data-testid="item-b" id="b">
        <SortableList.Content>Item B</SortableList.Content>
        <SortableList.Handle label="Reorder Item B" />
      </SortableList.Item>
      <SortableList.Item data-testid="item-c" disabled id="c">
        <SortableList.Content>Item C</SortableList.Content>
        <SortableList.Handle label="Reorder Item C" />
      </SortableList.Item>
    </SortableList>,
  );

describe('SortableList component', () => {
  it('renders the list and its items', () => {
    renderList();
    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });

  it('renders a list element with list items', () => {
    renderList();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders a labelled drag handle per item', () => {
    renderList();
    expect(screen.getByRole('button', { name: 'Reorder Item A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reorder Item B' })).toBeInTheDocument();
  });

  it('disables the handle for a disabled item', () => {
    renderList();
    expect(screen.getByRole('button', { name: 'Reorder Item C' })).toBeDisabled();
  });

  it('exposes a keyboard-operable handle (Space picks it up)', () => {
    renderList();
    const handle = screen.getByRole('button', { name: 'Reorder Item A' });
    fireEvent.keyDown(handle, { code: 'Space', key: ' ' });
    // dnd-kit announces the picked-up item via a live region.
    expect(screen.getByRole('button', { name: 'Reorder Item A' })).toHaveAttribute(
      'aria-roledescription',
      'sortable',
    );
  });

  it('throws when a handle is rendered outside an item', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<SortableList.Handle label="Reorder Item" />)).toThrow(
      /SortableList.Handle must be rendered inside a SortableList.Item/,
    );
    consoleError.mockRestore();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderList();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
