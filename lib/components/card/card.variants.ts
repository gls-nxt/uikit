import { cva, type VariantProps } from 'class-variance-authority';

import styles from './card.module.css';

export const cardVariants = cva(styles.card, {
  defaultVariants: {
    raised: true,
    size: 'lg',
  },
  variants: {
    raised: {
      false: '',
      true: styles['card--raised'],
    },
    size: {
      lg: styles['card--lg'],
      md: styles['card--md'],
      sm: styles['card--sm'],
      xl: styles['card--xl'],
    },
  },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;
