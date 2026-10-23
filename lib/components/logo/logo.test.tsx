import { render, screen } from '@testing-library/react';
import { cx } from 'class-variance-authority';
import { describe, expect, it } from 'vitest';

import Logo from './logo';
import logoVariants from './logo.variants';

describe('Logo', () => {
  it('renders the logo with default props', () => {
    render(<Logo />);

    const svgElement = screen.getByRole('img');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass(
      cx(logoVariants({ allowDarkMode: undefined, theme: undefined })),
    );
  });

  it('applies the theme variant', () => {
    render(<Logo theme="dark" />);

    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveClass(cx(logoVariants({ allowDarkMode: undefined, theme: 'dark' })));
  });

  it('applies allowDarkMode variant', () => {
    render(<Logo allowDarkMode={true} />);

    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveClass(cx(logoVariants({ allowDarkMode: true, theme: undefined })));
  });

  it('applies both theme and allowDarkMode variants', () => {
    render(<Logo allowDarkMode={false} theme="light" />);

    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveClass(cx(logoVariants({ allowDarkMode: false, theme: 'light' })));
  });

  it('applies the className prop', () => {
    render(<Logo className="custom-class" />);

    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveClass('custom-class');
  });

  it('applies additional props to the SVG element', () => {
    render(<Logo aria-label="My Logo" data-testid="logo-svg" />);

    const svgElement = screen.getByTestId('logo-svg');
    expect(svgElement).toHaveAttribute('aria-label', 'My Logo');
  });
});
