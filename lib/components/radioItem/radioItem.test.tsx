import { RadioGroup } from '@components/radioGroup';
import { render, screen } from '@testing-library/react';

import { RadioItem } from './radioItem';

describe('RadioItem Component', () => {
  it('renders with label text', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1">Option 1</RadioItem>
      </RadioGroup>,
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    render(
      <RadioGroup>
        <RadioItem disabled value="option2">
          Option 2
        </RadioItem>
      </RadioGroup>,
    );
    const button = screen.getByText('Option 2').previousElementSibling;

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toBeDisabled();
  });

  it('renders with indicator', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1">Option 1</RadioItem>
      </RadioGroup>,
    );
    const indicator = screen.getByRole('radio');
    expect(indicator).toBeInTheDocument();
  });
});
