import { cva, type VariantProps } from 'class-variance-authority';

import styles from './starRating.module.css';

export const starRatingVariants = cva(styles.starRating, {
  defaultVariants: {
    loading: false,
  },
  variants: {
    loading: {
      false: null,
      true: styles['starRating--loading'],
    },
  },
});

export const starRatingStarVariants = cva(styles.star, {
  defaultVariants: {
    highlighted: false,
  },
  variants: {
    highlighted: {
      false: null,
      true: styles['star--highlighted'],
    },
  },
});

export type StarRatingVariants = VariantProps<typeof starRatingVariants>;
export type StarRatingStarVariants = VariantProps<typeof starRatingStarVariants>;
