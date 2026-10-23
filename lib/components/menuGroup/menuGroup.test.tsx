import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { MenuGroup } from './menuGroup';

const mockItems = ['Test Item 1', 'Test Item 2', 'Test Item 3'];
vi.mock('@radix-ui/react-dropdown-menu', () => {
  return {
    Group: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Item: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Label: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('MenuGroup', () => {
  const mockOnSelect = vi.fn();

  afterEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders without crashing', () => {
    const label = 'Test Heading';
    render(<MenuGroup items={mockItems} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('renders with data-testid', () => {
    const testId = 'menu-item-test-id';
    render(<MenuGroup data-testid={testId} items={mockItems} label="Test Item" />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
