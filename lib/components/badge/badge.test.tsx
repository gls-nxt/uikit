import { HeartIcon } from '@icons';
import { render, screen } from '@testing-library/react';
import { cx } from 'class-variance-authority';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import Badge, { type BadgeProps } from './badge';
import { badgeVariants } from './badge.variants';

const defaultProps: BadgeProps = {
  children: 'Test Badge',
  willReceiveUpdates: true,
};

const renderComponent = (props: Partial<BadgeProps> = {}) => {
  return render(<Badge {...defaultProps} {...props} />);
};

describe('Badge Component', () => {
  it('renders the information box with default props correctly', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should apply the provided className', () => {
    const className = 'custom-class';
    renderComponent({ className });
    const badgeElement = screen.getByRole('status');
    expect(badgeElement).toHaveClass(cx(badgeVariants(), className));
  });

  it('should apply the provided color variant', () => {
    renderComponent({ color: 'red' });
    const badgeElement = screen.getByRole('status');
    expect(badgeElement).toHaveClass(badgeVariants({ color: 'red' }));
  });

  it('should apply the provided size variant and update Typography size for "sm"', () => {
    renderComponent({ size: 'sm' });
    const badgeElement = screen.getByRole('status');
    expect(badgeElement).toHaveClass(badgeVariants({ size: 'sm' }));
  });

  it('should pass through additional props to the div element', () => {
    const dataTestId = 'custom-badge';
    renderComponent({ 'data-testid': dataTestId });
    const badgeElement = screen.getByTestId(dataTestId);
    expect(badgeElement).toBeInTheDocument();
  });

  it('should render the children correctly', () => {
    const children = (
      <>
        Custom Content
        <HeartIcon data-testid="icon" style={{ color: 'red' }} />
      </>
    );
    renderComponent({ children });
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('is accessible with no violations', async () => {
    const children = (
      <>
        Custom Content
        <HeartIcon data-testid="icon" style={{ color: 'red' }} />
      </>
    );
    const { container } = renderComponent({ children });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
