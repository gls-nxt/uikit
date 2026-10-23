import { cva, type VariantProps } from 'class-variance-authority';

import styles from './typography.module.css';

const typographyVariants = cva(styles.typography, {
  compoundVariants: [
    { class: styles['typography--size-1'], size: 1, variant: 'heading' },
    { class: styles['typography--size-2'], size: 2, variant: 'heading' },
    { class: styles['typography--size-3'], size: 3, variant: 'heading' },
    { class: styles['typography--size-4'], size: 4, variant: 'heading' },
    { class: styles['typography--size-5'], size: 5, variant: 'heading' },
    { class: styles['typography--size-6'], size: 6, variant: 'heading' },

    { class: styles['typography--size-1'], size: 1, variant: 'body' },
    { class: styles['typography--size-2'], size: 2, variant: 'body' },
    { class: styles['typography--size-3'], size: 3, variant: 'body' },
    { class: styles['typography--size-4'], size: 4, variant: 'body' },
    { class: styles['typography--size-5'], size: 5, variant: 'body' },

    { class: styles['typography--size-1'], size: 1, variant: 'label' },
    { class: styles['typography--size-2'], size: 2, variant: 'label' },
    { class: styles['typography--size-3'], size: 3, variant: 'label' },
    { class: styles['typography--size-4'], size: 4, variant: 'label' },
    { class: styles['typography--size-5'], size: 5, variant: 'label' },
    { class: styles['typography--size-6'], size: 6, variant: 'label' },
  ],
  defaultVariants: {
    color: 'foreground',
    variant: 'body',
  },
  variants: {
    color: {
      error: styles['typography--color-error'],
      'error-muted': styles['typography--color-error-muted'],
      foreground: styles['typography--color-foreground'],
      inverted: styles['typography--color-inverted'],
      label: styles['typography--color-label'],
      light: styles['typography--color-light'],
      muted: styles['typography--color-muted'],
      primary: styles['typography--color-primary'],
      'primary-hover': styles['typography--color-primary-hover'],
      'primary-muted': styles['typography--color-primary-muted'],
      success: styles['typography--color-success'],
      'success-light': styles['typography--color-success-light'],
      warning: styles['typography--color-warning'],
    },
    fontWeight: {
      bold: styles['typography--weight-bold'],
      medium: styles['typography--weight-medium'],
      regular: styles['typography--weight-regular'],
      semibold: styles['typography--weight-semibold'],
    },
    size: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
    variant: {
      body: styles['typography--body'],
      heading: styles['typography--heading'],
      label: styles['typography--label'],
    },
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
export default typographyVariants;
