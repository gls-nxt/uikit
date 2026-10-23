import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import Textarea, { type TextareaProps } from './textarea';

import styles from './textarea.module.css';

const renderTextarea = (props?: Partial<TextareaProps>) => {
  return render(<Textarea {...props} />);
};

describe('Textarea Component', () => {
  it('renders the textarea with label correctly', () => {
    const id = 'textarea-default';
    const label = 'Default Field Label';
    renderTextarea({ id, label });

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toHaveAttribute('id', id);
  });

  it('renders without accessibility warnings', async () => {
    const { container } = renderTextarea({
      'data-testid': 'custom-test-id',
      error: true,
      errorMessage: 'Don\u2019t be a dummy',
      helperText: 'You need this help babe',
      label: 'Textarea field',
      onBlur: vi.fn(),
      onChange: vi.fn(),
      onFocus: vi.fn(),
    });

    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders helper text correctly', () => {
    const helperText = 'Test Helper Text';
    renderTextarea({ helperText });
    expect(screen.getByText(helperText)).toBeInTheDocument();
    const describedById = screen.getByRole('textbox').getAttribute('aria-describedby');
    const helperTextId = screen.getByText(helperText).id;
    const errorMessageId = screen.getByRole('status').id;
    expect(`${errorMessageId} ${helperTextId}`).toEqual(describedById);
  });

  it('renders error message correctly', () => {
    const errorMessage = 'Error Text';
    renderTextarea({ errorMessage });
    expect(screen.getByRole('status')).toHaveTextContent(errorMessage);
  });

  it('applies the correct error state class', () => {
    render(<Textarea error={true} label="Textarea" />);
    const rootElement = screen.getByRole('textbox').parentElement;
    expect(rootElement).toHaveClass(styles['textareaRoot--error']);
  });

  it('applies disabled state correctly when disabled prop is true', () => {
    const id = 'textarea-disabled';
    const label = 'Disabled Field Label';
    renderTextarea({ disabled: true, id, label });
    expect(screen.getByLabelText(label)).toBeDisabled();
  });

  it('calls onChange handler correctly', () => {
    const id = 'textarea-onchange';
    const label = 'Field with onChange event handler';
    const handleChange = vi.fn();
    renderTextarea({ id, label, onChange: handleChange });

    fireEvent.change(screen.getByLabelText(label), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls custom onFocus and onBlur handlers', () => {
    const id = 'textarea-focus-blur';
    const label = 'Field with focus/blur event handlers';
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    renderTextarea({ id, label, onBlur: handleBlur, onFocus: handleFocus });

    fireEvent.focus(screen.getByLabelText(label));
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(screen.getByLabelText(label));
    expect(handleBlur).toHaveBeenCalled();
  });

  it('is accessible with no violations', async () => {
    const id = 'textarea-accessibility';
    const label = 'Field with no violations';
    const { container } = renderTextarea({ id, label });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('applies custom className correctly', () => {
    const customClassName = 'custom-class';
    renderTextarea({ className: customClassName });
    const rootElement = screen.getByRole('textbox').parentElement?.parentElement;
    expect(rootElement).toHaveClass(customClassName);
  });

  it('renders as a textarea element', () => {
    renderTextarea({ label: 'My Textarea' });
    const el = screen.getByRole('textbox');
    expect(el.tagName.toLowerCase()).toBe('textarea');
  });

  it('forwards additional props to the textarea element', () => {
    renderTextarea({ 'data-testid': 'my-textarea', maxLength: 200, rows: 5 });
    const el = screen.getByTestId('my-textarea');
    expect(el).toHaveAttribute('maxlength', '200');
    expect(el).toHaveAttribute('rows', '5');
  });

  it('marks textarea as required when required prop is true', () => {
    renderTextarea({ label: 'Required Textarea', required: true });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when error prop is true', () => {
    renderTextarea({ error: true, label: 'Error Textarea' });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('omits aria-invalid when error prop is false', () => {
    renderTextarea({ label: 'No Error Textarea' });
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBeNull();
  });
});
