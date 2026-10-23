import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { supportsInvokerCommands } from './supportsInvokerCommands';
import { useInvokerFallbackClick } from './useInvokerFallbackClick';

vi.mock('./supportsInvokerCommands', () => ({
  supportsInvokerCommands: vi.fn(),
}));

const TestButton = ({
  fallback,
  onClick,
}: {
  fallback: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const handleClick = useInvokerFallbackClick(fallback, onClick);
  return (
    <button onClick={handleClick} type="button">
      trigger
    </button>
  );
};

describe('useInvokerFallbackClick', () => {
  it('does not call the fallback when native commands are supported', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(true);
    const fallback = vi.fn();
    render(<TestButton fallback={fallback} />);

    fireEvent.click(screen.getByText('trigger'));

    expect(fallback).not.toHaveBeenCalled();
  });

  it('calls the fallback when native commands are unsupported', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(false);
    const fallback = vi.fn();
    render(<TestButton fallback={fallback} />);

    fireEvent.click(screen.getByText('trigger'));

    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it('always calls the consumer-provided onClick, regardless of support', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(true);
    const onClick = vi.fn();
    render(<TestButton fallback={vi.fn()} onClick={onClick} />);

    fireEvent.click(screen.getByText('trigger'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('skips the fallback when the consumer calls preventDefault, matching native command dispatch', () => {
    vi.mocked(supportsInvokerCommands).mockReturnValue(false);
    const fallback = vi.fn();
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    render(<TestButton fallback={fallback} onClick={onClick} />);

    fireEvent.click(screen.getByText('trigger'));

    expect(fallback).not.toHaveBeenCalled();
  });
});
