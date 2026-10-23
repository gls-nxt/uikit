import { RadioItem } from '@components/radioItem';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { RadioGroup } from './radioGroup';

describe('RadioGroup Component', () => {
  it('renders radio items from options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(<RadioGroup options={options} />);
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('renders radio items passed as children', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(
      <RadioGroup>
        {options.map((option) => (
          <RadioItem key={option} value={option}>
            {option}
          </RadioItem>
        ))}
      </RadioGroup>,
    );
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('renders with disabled option', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { disabled: true, label: 'Option 2', value: '2' },
    ];
    render(<RadioGroup options={options} />);

    const disabledOptionButton = screen.getByText('Option 2').previousElementSibling;

    expect(disabledOptionButton).toBeInstanceOf(HTMLButtonElement);
    expect(disabledOptionButton).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RadioGroup aria-label="Choices" options={['Option 1', 'Option 2']} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
