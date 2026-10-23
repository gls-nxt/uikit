import {
  starRatingStarVariants,
  starRatingVariants,
} from '@components/starRating/starRating.variants';
import Typography from '@components/typography';
import { FilledStarIcon } from '@icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { Prettify } from '@utils/types';
import { cx } from 'class-variance-authority';
import type React from 'react';
import { type FieldsetHTMLAttributes, useCallback, useId, useState } from 'react';

import styles from './starRating.module.css';

const STAR_OPTIONS = [1, 2, 3, 4, 5] as const;
export type StarRatingOption = (typeof STAR_OPTIONS)[number];

export type StarRatingProps = Prettify<
  Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onSubmit'> & {
    title: string;
    labels: Record<StarRatingOption, string>;
    placeholder: string;
    onSubmit: (rating: StarRatingOption) => void;
    loading?: boolean;
    'data-testid'?: string;
  }
>;

export const StarRating = ({
  title,
  labels,
  placeholder,
  onSubmit,
  loading,
  disabled,
  className,
  'data-testid': dataTestId,
  ...rest
}: StarRatingProps) => {
  const id = useId();
  const [selectedRating, setSelectedRating] = useState<StarRatingOption | null>(null);
  const [highlightedRating, setHighlightedRating] = useState<StarRatingOption | null>(null);

  const displayRating = highlightedRating ?? selectedRating;

  const displayLabel = displayRating ? labels[displayRating] : placeholder;

  const handleRatingSelect = useCallback(
    (star: StarRatingOption) => {
      if (loading || disabled) {
        return;
      }

      setSelectedRating(star);
      setHighlightedRating(star);

      onSubmit(star);
    },
    [loading, disabled, onSubmit],
  );

  const handleRatingFocus = useCallback(
    (e: React.SyntheticEvent<HTMLLabelElement>) => {
      if (loading || disabled) {
        return;
      }

      const input = e.currentTarget.querySelector('input') as HTMLInputElement;
      if (!input) {
        return;
      }

      const star = Number(input.value) as StarRatingOption;
      setHighlightedRating(star);
    },
    [loading, disabled],
  );

  const handleRatingBlur = useCallback(() => {
    if (loading || disabled) {
      return;
    }

    setHighlightedRating(null);
  }, [loading, disabled]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Only handle click if it's not from keyboard navigation (because fieldset left-right arrow keys trigger this event)
      // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
      if (e.detail > 0) {
        const input = e.currentTarget.querySelector('input') as HTMLInputElement;
        if (!input) {
          return;
        }
        const star = Number(input.value) as StarRatingOption;
        handleRatingSelect(star);
      }
    },
    [handleRatingSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        const input = e.currentTarget.querySelector('input') as HTMLInputElement;
        if (!input) {
          return;
        }
        const star = Number(input.value) as StarRatingOption;
        handleRatingSelect(star);
      }
    },
    [handleRatingSelect],
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const star = Number(e.target.value) as StarRatingOption;
    setHighlightedRating(star);
  }, []);

  return (
    <fieldset
      className={cx(starRatingVariants({ loading }), className)}
      data-testid={dataTestId}
      disabled={loading || disabled}
      {...rest}
    >
      <Typography
        as="legend"
        className={styles.title}
        color="foreground"
        data-testid="star-rating-title"
        fontWeight="medium"
        size={4}
        variant="label"
      >
        {title}
      </Typography>

      <div className={styles.stars}>
        {STAR_OPTIONS.map((star) => (
          <label
            className={starRatingStarVariants({
              highlighted: displayRating ? star <= displayRating : false,
            })}
            key={star}
            onBlur={handleRatingBlur}
            onClick={handleClick}
            onFocus={handleRatingFocus}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleRatingFocus}
            onMouseLeave={handleRatingBlur}
          >
            <input
              checked={displayRating === star}
              className={styles.hiddenInput}
              name={`star-rating-${id}`}
              onChange={handleInputChange}
              type="radio"
              value={star}
            />
            <VisuallyHidden>{labels[star]}</VisuallyHidden>
            <span className={styles.iconWrapper}>
              <FilledStarIcon size="xl" />
            </span>
          </label>
        ))}
      </div>

      <Typography
        as="div"
        className={styles.label}
        color={displayRating ? 'foreground' : 'label'}
        data-testid="star-rating-display"
        size={5}
        variant="body"
      >
        {displayLabel}
      </Typography>
    </fieldset>
  );
};

StarRating.displayName = 'StarRating';

export default StarRating;
