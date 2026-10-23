import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import Button, { type ButtonProps } from './button';

import styles from './button.module.css';

const renderButton = (props?: Partial<ButtonProps>) => {
  return render(<Button {...props}>Click Me</Button>);
};

describe('Button Component', () => {
  it('renders the button with correct text', () => {
    renderButton();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies correct class for color and size variants', () => {
    renderButton({ color: 'primary', size: 'lg' });
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(styles['button--primary']);
    expect(buttonElement).toHaveClass(styles['button--lg']);
  });

  it('renders startIcon and endIcon correctly', () => {
    const StartIcon = () => <span>Start</span>;
    const EndIcon = () => <span>End</span>;

    renderButton({ endIcon: <EndIcon />, startIcon: <StartIcon /> });
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    renderButton({ fullWidth: true });
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(styles['button--fullWidth']);
  });

  it('applies disabled state correctly when disabled prop is true', () => {
    renderButton({ disabled: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as a link when asChild is true and the child link is provided', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Click Me</a>
      </Button>,
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is accessible with no violations', async () => {
    const { container } = renderButton();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders semantic elements for icons', () => {
    const StartIcon = () => <>Start Icon</>;
    renderButton({ startIcon: <StartIcon /> });
    const iconElement = screen.getByText('Start Icon');
    expect(iconElement.closest('span')).toHaveClass(styles.buttonIcon);
  });

  it('applies custom className correctly', () => {
    const customClassName = 'custom-class';
    renderButton({ className: customClassName });

    const element = screen.getByRole('button');
    expect(element).toHaveClass(customClassName);
  });
});
