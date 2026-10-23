import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import Dialog from '../dialog';

import Popover from './popover';

import styles from './popover.module.css';

type MockResizeObserverInstance = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

// Add ResizeObserver mock
const mockResizeObserver = vi.fn();
mockResizeObserver.mockImplementation(function (this: MockResizeObserverInstance) {
  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
});

describe('Popover component', () => {
  // Set up ResizeObserver mock
  vi.stubGlobal('ResizeObserver', mockResizeObserver);

  const renderPopover = (props = {}) => {
    return render(
      <Popover
        data-testid="popover"
        trigger={
          <button data-testid="popover-trigger" type="button">
            toggle
          </button>
        }
        {...props}
      >
        popoverContent
      </Popover>,
    );
  };

  it('renders trigger button', () => {
    renderPopover();
    expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
  });

  it('opens the popover on click', () => {
    renderPopover();
    fireEvent.click(screen.getByTestId('popover-trigger'));
    expect(screen.getByTestId('popover')).toBeVisible();
  });

  it('closes the popover on second click', () => {
    renderPopover();
    const trigger = screen.getByTestId('popover-trigger');

    // Open popover
    fireEvent.click(trigger);
    expect(screen.getByTestId('popover')).toBeVisible();

    // Close popover
    fireEvent.click(trigger);
    expect(screen.queryByTestId('popover')).toBeNull();
  });

  it('renders with controlled open state', () => {
    renderPopover({ open: true });
    expect(screen.getByTestId('popover')).toBeVisible();
  });

  it('renders heading', () => {
    renderPopover({
      heading: <span data-testid="popover-heading">popoverHeading</span>,
      open: true,
    });
    expect(screen.getByTestId('popover-heading')).toBeInTheDocument();
  });

  it('applies custom class name correctly', () => {
    renderPopover({
      className: 'test-classname',
      open: true,
    });
    expect(screen.getByTestId('popover')).toHaveClass('test-classname');
  });

  it('calls onOpenChange when popover state changes', () => {
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });

    // Test opening
    fireEvent.click(screen.getByTestId('popover-trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Test closing
    fireEvent.click(screen.getByTestId('popover-trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders with different width variants', () => {
    renderPopover({
      'data-testid': 'popover',
      open: true,
      width: 'sm',
    });
    expect(screen.getByTestId('popover')).toHaveClass(styles['popover-content--sm']);
  });

  it('renders with custom width', () => {
    const customWidth = 200;
    renderPopover({
      customWidth,
      open: true,
    });
    expect(screen.getByTestId('popover')).toHaveStyle({ maxWidth: `${customWidth}px` });
  });

  it('merges custom styles with its derived styles', () => {
    renderPopover({
      customWidth: 200,
      heading: 'Popover heading',
      open: true,
      style: { backgroundColor: 'red' },
    });

    const popover = screen.getByTestId('popover');

    expect(popover.style.backgroundColor).toBe('red');
    expect(popover.style.maxWidth).toBe('200px');
    expect(popover.style.textAlign).toBe('left');
  });

  it('renders inside the native dialog when used in Dialog.Content', () => {
    const { container } = render(
      <Dialog.Root id="popover-dialog">
        <Dialog.Content aria-labelledby="popover-dialog-title">
          <Dialog.Title id="popover-dialog-title">Dialog title</Dialog.Title>
          <Popover
            data-testid="popover"
            open
            trigger={
              <button data-testid="popover-trigger" type="button">
                toggle
              </button>
            }
          >
            popoverContent
          </Popover>
        </Dialog.Content>
      </Dialog.Root>,
    );

    const dialog = container.querySelector('dialog');
    dialog?.setAttribute('open', '');

    expect(dialog).toContainElement(screen.getByTestId('popover'));
  });

  it('has no accessibility violations', async () => {
    // Radix Popover.Content has role="dialog", so axe requires it to expose an
    // accessible name. Provide one via aria-label to satisfy the
    // "dialog must have an accessible name" rule.
    const { container } = renderPopover({ 'aria-label': 'Popover content', open: true });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
