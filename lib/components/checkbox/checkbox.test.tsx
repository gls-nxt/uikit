import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox component', () => {
  it('renders without crashing', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Checkbox data-testid="checkbox">Label</Checkbox>);
    const label = screen.getByText('Label');
    expect(label).toBeInTheDocument();
  });

  it('toggles the checkbox when clicked', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('applies custom class names', () => {
    render(
      <Checkbox
        className="custom-class"
        data-testid="checkbox"
        indicatorClassName="custom-indicator-class"
        inputClassName="custom-button-class"
        labelClassName="custom-label-class"
      >
        Label
      </Checkbox>,
    );
    const checkbox = screen.getByTestId('checkbox').nextElementSibling;
    const label = screen.getByText('Label');
    expect(checkbox).toHaveClass('custom-button-class');
    expect(label).toHaveClass('custom-label-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox>Label</Checkbox>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
