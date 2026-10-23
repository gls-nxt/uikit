import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import Card, { type CardProps } from './card';

import styles from './card.module.css';

// Helper function to render the component with default props
const renderCard = (props?: Partial<CardProps>) => {
  return render(<Card {...props} />);
};

describe('Card Component', () => {
  it('renders the card with default props correctly', () => {
    const { container } = renderCard();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render card content correctly', () => {
    renderCard({
      children: (
        <>
          <h1>Card Title</h1>
          <p>Card Content</p>
        </>
      ),
    });
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies the correct size classes based on the size prop', () => {
    const { container } = renderCard({ size: 'sm' });
    expect(container.firstChild).toHaveClass(styles['card--sm']);
  });

  it('applies the raised class when raised prop is true', () => {
    const { container } = renderCard({ raised: true });
    expect(container.firstChild).toHaveClass(styles['card--raised']);
  });

  it('renders with custom className', () => {
    const customClassName = 'custom-card';
    const { container } = renderCard({ className: customClassName });
    expect(container.firstChild).toHaveClass(customClassName);
  });

  it('forwards ref to the DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Card data-testid="card" ref={ref}>
        Hello
      </Card>,
    );

    expect(ref.current).toBe(getByTestId('card'));
  });
});
