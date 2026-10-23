import { UmbrellaIcon } from '@icons';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { ComboboxItem } from './comboboxItem';

describe('ComboboxItem', () => {
  it('renders children', () => {
    const { getByText } = render(<ComboboxItem>child</ComboboxItem>);
    getByText('child');
  });

  it('renders value if children not provided', () => {
    const { getByText } = render(<ComboboxItem>value</ComboboxItem>);
    getByText('value');
  });

  it('renders prefix if provided', () => {
    const { container, getByText } = render(
      <ComboboxItem>
        <UmbrellaIcon />
        This umbrella
      </ComboboxItem>,
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    getByText('This umbrella');
  });

  it('applies className when provided', () => {
    const { container } = render(<ComboboxItem className="custom-class">child</ComboboxItem>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('applies disabled styles and aria-disabled when disabled', () => {
    const { container } = render(<ComboboxItem disabled>child</ComboboxItem>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('aria-disabled', 'true');
    expect(element.className).toContain('itemDisabled');
  });

  it('does not apply disabled styles when disabled is false', () => {
    const { container } = render(<ComboboxItem disabled={false}>child</ComboboxItem>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('aria-disabled', 'false');
    expect(element).not.toHaveClass('itemDisabled');
  });
});
