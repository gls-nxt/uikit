import Button from '@components/button';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import Input, { type InputProps } from './input';

import styles from './input.module.css';

// Helper function to render the component with default props
const renderInput = (props?: Partial<InputProps>) => {
  return render(<Input {...props} />);
};

const SampleIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="currentColor"
    />
  </svg>
);

describe('Input Component', () => {
  // Functional and Edge Case Testing
  it('renders the input with label correctly', () => {
    const id = 'input-default';
    const label = 'Default Field Label';
    renderInput({ id, label });

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toHaveAttribute('id', id);
  });

  it('renders without accessibility warnings', async () => {
    const { container } = renderInput({
      'data-testid': 'custom-test-id',
      error: true,
      errorMessage: 'Don’t be a dummy',
      helperText: 'You need this help babe',
      label: 'Input field',
      onBlur: vi.fn(),
      onChange: vi.fn(),
      onFocus: vi.fn(),
      size: 'sm',
      slots: {
        prefix: <SampleIcon />,
        suffix: <Button>Action</Button>,
      },
    });

    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders helper text correctly', () => {
    const id = 'input-helper';
    const helperText = 'Test Helper Text';
    renderInput({ helperText, id });
    expect(screen.getByText(helperText)).toBeInTheDocument();
    const helperTextId = screen.getByText(helperText).id;

    expect(helperTextId).toBe(`${id}-helper-text`);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', helperTextId);
  });

  it('renders error text correctly', () => {
    const id = 'input-error';
    const errorMessage = 'Error Text';
    renderInput({ errorMessage, id });
    const error = screen.getByRole('status');
    expect(error).toHaveTextContent(errorMessage);
    expect(error.id).toBe(`${id}-error-message`);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', error.id);
  });

  it('does not add aria-describedby when there is no helper or error message', () => {
    renderInput();

    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
  });

  it('applies the correct error state class', () => {
    const label = 'Input';
    render(<Input {...{ error: true, label }} />);
    const rootElement = screen.getByRole('textbox').parentElement?.parentElement;
    expect(rootElement).toHaveClass(styles['inputRoot--error']);
  });

  it('applies disabled state correctly when disabled prop is true', () => {
    const id = 'input-disabled';
    const label = 'Disabled Field Label';
    renderInput({ disabled: true, id, label });
    expect(screen.getByLabelText(label)).toBeDisabled();
  });

  it('renders prefix and suffix components correctly', () => {
    const id = 'input-prefix-suffix';
    const PrefixComponent = () => <span>Prefix</span>;
    const SuffixComponent = () => <span>Suffix</span>;

    renderInput({
      id,
      slots: { prefix: <PrefixComponent />, suffix: <SuffixComponent /> },
    });
    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });

  it('calls onChange handler correctly', () => {
    const id = 'input-onchange';
    const label = 'Field with onChange event handler';
    const handleChange = vi.fn();
    renderInput({ id, label, onChange: handleChange });

    fireEvent.change(screen.getByLabelText(label), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls custom onFocus and onBlur handlers', () => {
    const id = 'input-focus-blur';
    const label = 'Field with focus/blur event handlers';
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    renderInput({ id, label, onBlur: handleBlur, onFocus: handleFocus });

    fireEvent.focus(screen.getByLabelText(label));
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(screen.getByLabelText(label));
    expect(handleBlur).toHaveBeenCalled();
  });

  // Accessibility and Semantic Testing
  it('is accessible with no violations', async () => {
    const id = 'input-accessibility';
    const label = 'Field with no violations';
    const { container } = renderInput({ id, label });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('uses correct semantic elements for prefix and suffix', () => {
    const id = 'input-semantic';
    const PrefixComponent = () => <span>Prefix</span>;
    const SuffixComponent = () => <span>Suffix</span>;

    renderInput({
      id,
      slots: { prefix: <PrefixComponent />, suffix: <SuffixComponent /> },
    });
    expect(screen.getByText('Prefix').closest('div')).toHaveClass(styles.inputAdornment);
    expect(screen.getByText('Suffix').closest('div')).toHaveClass(styles.inputAdornment);
  });

  it('directly targets input by its id', () => {
    const id = 'input-direct-id';
    renderInput({ id, label: 'Direct ID Input' });

    // Access the input element directly by its id
    const inputElement = document.getElementById(id);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('applies custom className correctly', () => {
    const customClassName = 'custom-class';
    renderInput({ className: customClassName });
    const rootElement = screen.getByRole('textbox').parentElement?.parentElement?.parentElement;
    expect(rootElement).toHaveClass(customClassName);
  });

  it('renders with the compound slot API', () => {
    render(
      <Input.Root error={true} id="slot-input" labelled>
        <Input.Field>
          <Input.Prefix>
            <SampleIcon />
          </Input.Prefix>
          <Input.Main>
            <Input.Control />
            <Input.Label>Email</Input.Label>
          </Input.Main>
          <Input.Suffix>S</Input.Suffix>
        </Input.Field>
        <Input.HelperText>Your work email</Input.HelperText>
        <Input.ErrorMessage>Required</Input.ErrorMessage>
      </Input.Root>,
    );

    const input = document.getElementById('slot-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'slot-input-error-message slot-input-helper-text',
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Your work email')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders compound description IDs in server markup', () => {
    const markup = renderToStaticMarkup(
      <Input.Root error={true} id="server-input" labelled>
        <Input.Field>
          <Input.Main>
            <Input.Control />
            <Input.Label>Email</Input.Label>
          </Input.Main>
        </Input.Field>
        <Input.HelperText>Your work email</Input.HelperText>
        <Input.ErrorMessage>Required</Input.ErrorMessage>
      </Input.Root>,
    );

    expect(markup).toContain(
      'aria-describedby="server-input-error-message server-input-helper-text"',
    );
    expect(markup).toContain('id="server-input-helper-text"');
    expect(markup).toContain('id="server-input-error-message"');
  });

  it('does not add aria-describedby when compound helper and error slots are omitted', () => {
    render(
      <Input.Root id="slot-input">
        <Input.Field>
          <Input.Main>
            <Input.Control />
          </Input.Main>
        </Input.Field>
      </Input.Root>,
    );

    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
  });

  it('supports asChild on Input.Control', () => {
    render(
      <Input.Root id="slot-input">
        <Input.Field>
          <Input.Main>
            <Input.Control asChild>
              <input data-testid="custom-input" />
            </Input.Control>
          </Input.Main>
        </Input.Field>
      </Input.Root>,
    );

    expect(screen.getByTestId('custom-input')).toHaveAttribute('id', 'slot-input');
  });
});
