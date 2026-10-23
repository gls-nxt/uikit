import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import Typography, { type TypographyProps } from './typography';

import styles from './typography.module.css';

// Helper function to render the component with default props
const renderTypography = (props?: Partial<TypographyProps<React.ElementType>>) => {
  return render(
    <Typography size={2} variant="body" {...props}>
      Test Text
    </Typography>,
  );
};

describe('Typography Component', () => {
  // Functional and Edge Case Testing
  it('renders the default body variant correctly', () => {
    renderTypography();
    const element = screen.getByText('Test Text');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('span'); // Default for body
  });

  it('renders heading variant with correct size', () => {
    renderTypography({ size: 3, variant: 'heading' });
    const element = screen.getByText('Test Text');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('h3'); // h3 for heading size 3
  });

  it('renders label variant correctly', () => {
    renderTypography({ variant: 'label' });
    const element = screen.getByText('Test Text');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  it('applies color and fontWeight classes correctly', () => {
    renderTypography({ color: 'primary', fontWeight: 'bold' });
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass(styles['typography--color-primary']);
    expect(element).toHaveClass(styles['typography--weight-bold']);
  });

  // Edge Cases and Boundaries
  it('handles unknown variant gracefully', () => {
    renderTypography({ variant: undefined });
    const element = screen.getByText('Test Text');
    expect(element).toBeInTheDocument();
  });

  // Accessibility and Semantic Testing
  it('is accessible with no violations', async () => {
    const { container } = renderTypography();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('uses correct semantic elements for headings', () => {
    renderTypography({ size: 1, variant: 'heading' });
    const element = screen.getByText('Test Text');
    expect(element.tagName.toLowerCase()).toBe('h1'); // Heading size 1 should render h1
  });

  // Interactive and User Event Testing (if applicable)
  it('does not crash on user interaction', () => {
    renderTypography({ as: 'button' });
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClassName = 'custom-class';
    renderTypography({ className: customClassName });

    const element = screen.getByText('Test Text');
    expect(element).toHaveClass(customClassName);
  });
});
