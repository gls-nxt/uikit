import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Dialog from '../dialog';

import Tooltip from './tooltip';

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

describe('Tooltip component', () => {
  // Set up ResizeObserver mock
  vi.stubGlobal('ResizeObserver', mockResizeObserver);

  const renderTooltip = (props = {}) => {
    return render(
      <Tooltip
        data-testid="tooltip"
        delayDuration={0}
        trigger={
          <button data-testid="tooltip-trigger" type="button">
            toggle
          </button>
        }
        {...props}
      >
        tooltipContent
      </Tooltip>,
    );
  };

  // There is an open issue mentioned here: https://github.com/radix-ui/primitives/issues/3034
  // that refers to the tooltipContent being rendered twice in the DOM

  it('renders trigger button', () => {
    renderTooltip();
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
  });

  it('tooltip renders properly (currently duplicated due to a known bug)', async () => {
    renderTooltip({
      open: true,
      trigger: (
        <button data-testid="tooltip-trigger" type="button">
          toggle
        </button>
      ),
    });
    const tooltips = screen.getAllByTestId('tooltip');
    tooltips.forEach((tooltip) => {
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('renders heading', () => {
    renderTooltip({
      heading: <span data-testid="tooltip-heading">tooltipHeading</span>,
      open: true,
    });
    const tooltipHeadings = screen.getAllByTestId('tooltip-heading');
    tooltipHeadings.forEach((tooltipHeading) => {
      expect(tooltipHeading).toBeInTheDocument();
    });
  });

  it('applies custom class name correctly', () => {
    renderTooltip({
      className: 'test-classname',
      'data-testid': 'tooltip',
      open: true,
    });
    const tooltips = screen.getAllByTestId('tooltip');

    tooltips.forEach((tooltip) => {
      expect(tooltip).toHaveClass('test-classname');
    });
  });

  it('opens the tooltip on touch', () => {
    renderTooltip();
    fireEvent.touchEnd(screen.getByTestId('tooltip-trigger'));
    expect(screen.getByTestId('tooltip')).toBeVisible();
  });

  it('renders with data-testid', () => {
    renderTooltip({
      'data-testid': 'tooltip',
      open: true,
    });
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('renders inside the native dialog when used in Dialog.Content', () => {
    const { container } = render(
      <Dialog.Root id="tooltip-dialog">
        <Dialog.Content aria-labelledby="tooltip-dialog-title">
          <Dialog.Title id="tooltip-dialog-title">Dialog title</Dialog.Title>
          <Tooltip
            data-testid="tooltip"
            open
            trigger={
              <button data-testid="tooltip-trigger" type="button">
                toggle
              </button>
            }
          >
            tooltipContent
          </Tooltip>
        </Dialog.Content>
      </Dialog.Root>,
    );

    const dialog = container.querySelector('dialog');
    dialog?.setAttribute('open', '');
    expect(dialog).toBeInTheDocument();

    screen.getAllByTestId('tooltip').forEach((tooltip) => {
      expect(dialog).toContainElement(tooltip);
    });
  });
});
