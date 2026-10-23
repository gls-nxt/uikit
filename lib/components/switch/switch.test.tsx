import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Switch } from './switch';

describe('Switch component', () => {
  it('renders without crashing', () => {
    render(<Switch data-testid="switch" />);
    const element = screen.getByTestId('switch');
    expect(element).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Switch data-testid="switch">Label</Switch>);
    const label = screen.getByText('Label');
    expect(label).toBeInTheDocument();
  });

  it('toggles the Switch when clicked', () => {
    render(<Switch data-testid="switch" />);
    const element = screen.getByTestId('switch');
    expect(element).not.toBeChecked();
    fireEvent.click(element);
    expect(element).toBeChecked();
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it('applies custom class names', () => {
    render(
      <Switch
        className="custom-class"
        data-testid="switch"
        labelClassName="custom-label-class"
        rootClassName="custom-root-class"
        thumbClassName="custom-thumb-class"
      >
        Label
      </Switch>,
    );
    const element = screen.getByTestId('switch');
    const label = screen.getByText('Label');
    expect(element.parentElement).toHaveClass('custom-class');
    expect(element).toHaveClass('custom-root-class');
    expect(label).toHaveClass('custom-label-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch>Label</Switch>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
