import type * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { MenuHeading } from './menuHeading';

import styles from './menuHeading.module.css';

type RadixMenuType = typeof RadixMenu;

vi.mock('@radix-ui/react-dropdown-menu', async (importOriginal) => {
  const actual = (await importOriginal()) as RadixMenuType;
  return {
    ...actual,
    Label: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('MenuHeading', () => {
  const mockOnSelect = vi.fn();

  afterEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders without crashing', () => {
    const label = 'Test Heading';
    render(<MenuHeading label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('applies size class name correctly', () => {
    const label = 'Test Heading';
    render(<MenuHeading label={label} size="lg" />);
    const item = screen.getByText(label);
    expect(item).toHaveClass(styles['menuHeading--lg']);
  });

  test('renders with data-testid', () => {
    const testId = 'menu-item-test-id';
    render(<MenuHeading data-testid={testId} label="Test Item" />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
