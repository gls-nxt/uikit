import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, vi } from 'vitest';

import { MenuItem } from './menuItem';

import styles from './menuItem.module.css';

vi.mock('@radix-ui/react-dropdown-menu', () => {
  return {
    Item: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  };
});

describe('MenuItem', () => {
  const mockOnSelect = vi.fn();

  afterEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders without crashing', () => {
    const label = 'Test Item';
    render(<MenuItem label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('renders prefix and suffix when provided', () => {
    const PrefixIcon = () => <span>Prefix</span>;
    const SuffixIcon = () => <span>Suffix</span>;
    render(<MenuItem label="Test Item" prefix={<PrefixIcon />} suffix={<SuffixIcon />} />);
    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });

  test('applies size class name correctly', () => {
    render(<MenuItem label="Test Item" size="lg" />);
    const item = screen.getByText('Test Item');
    expect(item).toHaveClass(styles['menuItem--lg']);
  });

  test('renders with data-testid', () => {
    const testId = 'menu-item-test-id';
    render(<MenuItem data-testid={testId} label="Test Item" />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MenuItem label="Test Item" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
