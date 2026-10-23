import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import StarRating from './starRating';

describe('StarRatingSelector', () => {
  it('renders without crashing', () => {
    render(
      <StarRating
        labels={{ 1: 'test', 2: 'test', 3: 'test', 4: 'test', 5: 'test' }}
        loading={false}
        onSubmit={vi.fn()}
        placeholder="test placeholder"
        title="test title"
      />,
    );
    expect(screen.getByText('test title')).toBeInTheDocument();
  });

  it('renders star rating buttons with correct aria-labels', () => {
    const onRating = vi.fn();
    render(
      <StarRating
        labels={{ 1: 'test 1', 2: 'test 2', 3: 'test 3', 4: 'test 4', 5: 'test 5' }}
        loading={false}
        onSubmit={onRating}
        placeholder="test placeholder"
        title="test"
      />,
    );

    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);

    stars.forEach((star, index) => {
      expect(star.parentElement).toHaveTextContent(`test ${index + 1}`);
    });
    expect(screen.getByText('test placeholder')).toBeInTheDocument();
  });

  it('handles star rating selection', () => {
    const onRating = vi.fn();
    render(
      <StarRating
        labels={{ 1: 'test 1', 2: 'test 2', 3: 'test 3', 4: 'test 4', 5: 'test 5' }}
        loading={false}
        onSubmit={onRating}
        placeholder="test placeholder"
        title="test"
      />,
    );

    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.click(thirdStar, { detail: 1 });

    expect(onRating).toHaveBeenCalledWith(3);
  });

  it('updates display rating on hover', () => {
    const onRating = vi.fn();
    render(
      <StarRating
        labels={{ 1: 'test 1', 2: 'test 2', 3: 'test 3', 4: 'test 4', 5: 'test 5' }}
        loading={false}
        onSubmit={onRating}
        placeholder="test placeholder"
        title="test"
      />,
    );

    const fourthStar = screen.getAllByRole('radio')[3];
    fireEvent.mouseEnter(fourthStar);

    const ratingDisplay = screen.getByTestId('star-rating-display');
    expect(ratingDisplay).toHaveTextContent('test 4');

    fireEvent.mouseLeave(fourthStar);
    expect(screen.getByTestId('star-rating-display')).toHaveTextContent('test placeholder');
  });

  it('prevents submission while loading', () => {
    const onRating = vi.fn();

    render(
      <StarRating
        labels={{ 1: 'test', 2: 'test', 3: 'test', 4: 'test', 5: 'test' }}
        loading={true}
        onSubmit={onRating}
        placeholder="test"
        title="test"
      />,
    );

    const firstStar = screen.getAllByRole('radio')[0];
    fireEvent.click(firstStar, { detail: 1 });

    expect(onRating).not.toHaveBeenCalled();
  });

  it('prevents submission while disabled', () => {
    const onRating = vi.fn();

    render(
      <StarRating
        disabled={true}
        labels={{ 1: 'test', 2: 'test', 3: 'test', 4: 'test', 5: 'test' }}
        onSubmit={onRating}
        placeholder="test"
        title="test"
      />,
    );

    const firstStar = screen.getAllByRole('radio')[0];
    fireEvent.click(firstStar, { detail: 1 });

    expect(onRating).not.toHaveBeenCalled();
  });

  it('is accessible with no violations', async () => {
    const { container } = render(
      <StarRating
        labels={{ 1: 'test', 2: 'test', 3: 'test', 4: 'test', 5: 'test' }}
        loading={false}
        onSubmit={vi.fn()}
        placeholder="test"
        title="test"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
