import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { IconButton, type IconButtonProps } from './iconButton';

import styles from './iconButton.module.css';

const defaultProps = {
  icon: <></>,
  label: 'label',
};

const setup = (props?: Partial<IconButtonProps>) => {
  return render(<IconButton {...defaultProps} {...props} />);
};

describe('IconButton', () => {
  it('renders the button with correct icon', () => {
    const { getByText } = setup({ icon: <>icon</> });
    getByText('icon');
  });

  it('applies correct class for color variant', () => {
    const { rerender, getByRole } = setup({ color: 'primary' });

    const button = getByRole('button');
    expect(button).toHaveClass(styles['iconButton--primary']);

    rerender(<IconButton {...defaultProps} color="secondary" />);
    expect(button).toHaveClass(styles['iconButton--secondary']);

    rerender(<IconButton {...defaultProps} color="tertiary" />);
    expect(button).toHaveClass(styles['iconButton--tertiary']);

    rerender(<IconButton {...defaultProps} color="destructive" />);
    expect(button).toHaveClass(styles['iconButton--destructive']);

    rerender(<IconButton {...defaultProps} color="blurred" />);
    expect(button).toHaveClass(styles['iconButton--blurred']);
  });

  it('applies correct class for size variant', () => {
    const { rerender, getByRole } = setup({ size: 'lg' });

    const button = getByRole('button');
    expect(button).toHaveClass(styles['iconButton--lg']);

    rerender(<IconButton {...defaultProps} size="md" />);
    expect(button).toHaveClass(styles['iconButton--md']);

    rerender(<IconButton {...defaultProps} size="sm" />);
    expect(button).toHaveClass(styles['iconButton--sm']);

    rerender(<IconButton {...defaultProps} size="xs" />);
    expect(button).toHaveClass(styles['iconButton--xs']);
  });

  it('applies correct class for shape variant', () => {
    const { rerender, getByRole } = setup({ shape: 'round' });

    const button = getByRole('button');
    expect(button).toHaveClass(styles['iconButton--round']);

    rerender(<IconButton {...defaultProps} shape="square" />);
    expect(button).toHaveClass(styles['iconButton--square']);
  });

  it('applies disabled state correctly when disabled prop is true', () => {
    const { getByRole } = setup({ disabled: true });

    expect(getByRole('button')).toBeDisabled();
  });

  it('passes data-testid', () => {
    const { getByTestId } = setup({ 'data-testid': 'test-id' });

    expect(getByTestId('test-id')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = setup({ onClick: handleClick });

    getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('is accessible with no violations', async () => {
    const { container } = setup();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('applies custom className correctly', () => {
    const { getByRole } = setup({ className: 'custom-class' });

    expect(getByRole('button')).toHaveClass('custom-class');
  });
});
