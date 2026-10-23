import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button';
import { TableColumnOrganiser } from './tableColumnOrganiser';
import type { TableColumnOrganiserItem } from './tableColumnOrganiser.types';

const items: TableColumnOrganiserItem[] = [
  {
    hideable: false,
    id: 'name',
    label: 'Name',
    reorderable: false,
    visible: true,
  },
  { id: 'address', label: 'Address', visible: true },
  { id: 'status', label: 'Status', visible: false },
];

const defaultProps = {
  getReorderLabel: (item: TableColumnOrganiserItem) => `Reorder ${item.label}`,
  items,
  onReorder: vi.fn(),
  onVisibilityChange: vi.fn(),
  triggerLabel: 'Columns',
};

describe('TableColumnOrganiser', () => {
  it('renders a default trigger and mounts the controlled items when opened', async () => {
    const user = userEvent.setup();
    render(<TableColumnOrganiser {...defaultProps} />);

    expect(screen.queryByRole('checkbox', { name: 'Name' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Columns' }));

    expect(screen.getByRole('checkbox', { name: 'Name' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Status' })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Reorder Address' })).toBeInTheDocument();
  });

  it('reports the next visibility without owning state', async () => {
    const user = userEvent.setup();
    const onVisibilityChange = vi.fn();
    render(
      <TableColumnOrganiser
        {...defaultProps}
        defaultOpen
        onVisibilityChange={onVisibilityChange}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Status' }));

    expect(onVisibilityChange).toHaveBeenCalledWith('status', true);
    expect(screen.getByRole('checkbox', { name: 'Status' })).not.toBeChecked();
  });

  it('disables visibility and reordering independently', () => {
    render(<TableColumnOrganiser {...defaultProps} defaultOpen />);

    expect(screen.getByRole('checkbox', { name: 'Name' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reorder Name' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Address' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Reorder Address' })).toBeEnabled();
  });

  it('renders reset only when configured and modified', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    const { rerender } = render(
      <TableColumnOrganiser
        {...defaultProps}
        defaultOpen
        isModified={false}
        onReset={onReset}
        resetLabel="Reset columns"
      />,
    );

    expect(screen.queryByRole('button', { name: 'Reset columns' })).not.toBeInTheDocument();

    rerender(
      <TableColumnOrganiser
        {...defaultProps}
        defaultOpen
        isModified
        onReset={onReset}
        resetLabel="Reset columns"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Reset columns' }));

    expect(onReset).toHaveBeenCalledOnce();
  });

  it('supports custom triggers, headings, empty content and open-state callbacks', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <TableColumnOrganiser
        {...defaultProps}
        emptyContent="No configurable columns"
        heading="Choose columns"
        items={[]}
        onOpenChange={onOpenChange}
        trigger={<Button type="button">Customize</Button>}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Customize' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Choose columns')).toBeInTheDocument();
    expect(screen.getByText('No configurable columns')).toBeInTheDocument();
  });

  it('uses the popover heading layout and forwards custom panel styles', () => {
    render(
      <TableColumnOrganiser
        {...defaultProps}
        defaultOpen
        heading="Choose columns"
        panelStyle={{ backgroundColor: 'red' }}
      />,
    );

    const panel = screen.getByRole('dialog', { name: 'Columns' });

    expect(panel.style.backgroundColor).toBe('red');
    expect(panel.style.maxWidth).toBe('');
    expect(panel.style.textAlign).toBe('left');
  });

  it('has no accessibility violations while open', async () => {
    const { container } = render(
      <TableColumnOrganiser
        {...defaultProps}
        defaultOpen
        isModified
        onReset={vi.fn()}
        resetLabel="Reset columns"
      />,
    );

    expect(await axe(container.ownerDocument.body)).toHaveNoViolations();
  });
});
