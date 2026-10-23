import { AnchorIcon, UserIcon } from '@icons';
import { render, screen } from '@testing-library/react';

import { LabeledDetail } from './LabeledDetail';

describe('LabeledDetail', () => {
  it('renders with iconComponent and details', () => {
    const { container } = render(
      <LabeledDetail details="123456789" iconComponent={AnchorIcon} label="Account" />,
    );
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with iconImage and details', () => {
    const image = <img alt="test" height={54} src="test.png" width={54} />;
    render(<LabeledDetail details="987654321" iconImage={image} label="Account" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('987654321')).toBeInTheDocument();
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('renders nothing if details is missing', () => {
    const { container } = render(<LabeledDetail iconComponent={AnchorIcon} label="Account" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders custom label and details', () => {
    render(<LabeledDetail details="Some details" iconComponent={UserIcon} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('renders only required props', () => {
    render(
      <LabeledDetail
        details="Required details"
        iconComponent={AnchorIcon}
        label="Required Label"
      />,
    );
    expect(screen.getByText('Required Label')).toBeInTheDocument();
    expect(screen.getByText('Required details')).toBeInTheDocument();
  });
});
