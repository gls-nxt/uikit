import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { InputBase, type InputBaseProps } from './inputBase';

import styles from './inputBase.module.css';

const renderInput = (props?: Partial<InputBaseProps>) => {
  const defaultProps: InputBaseProps = {
    placeholder: 'Enter text',
    ...props,
  } as InputBaseProps;
  return render(<InputBase {...defaultProps} />);
};

describe('InputBase Component', () => {
  it('renders an input element', () => {
    renderInput();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies size variant classes', () => {
    (['lg', 'md', 'sm'] as const).forEach((size) => {
      const { container, unmount } = renderInput({ size });
      const inputEl = container.querySelector('input');
      expect(inputEl).toHaveClass(styles[`input--${size}`]);
      unmount();
    });
  });

  it('sets aria-invalid when hasError=true', () => {
    renderInput({ hasError: true });
    const inputEl = screen.getByPlaceholderText('Enter text');
    expect(inputEl).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when hasError=false', () => {
    renderInput({ hasError: false });
    const inputEl = screen.getByPlaceholderText('Enter text');
    expect(inputEl).toHaveAttribute('aria-invalid', 'false');
  });

  it('merges custom className', () => {
    const { container } = renderInput({ className: 'extra-class' });
    const inputEl = container.querySelector('input');
    expect(inputEl).toHaveClass('extra-class');
  });

  it('forwards additional props (e.g., name)', () => {
    renderInput({ name: 'username' });
    expect(screen.getByPlaceholderText('Enter text')).toHaveAttribute('name', 'username');
  });

  it('supports disabled state', () => {
    renderInput({ disabled: true });
    const inputEl = screen.getByPlaceholderText('Enter text');
    expect(inputEl).toBeDisabled();
  });

  it('is accessible with no violations', async () => {
    const { container } = renderInput();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
