import { cva, type VariantProps } from 'class-variance-authority';

import styles from './dialog.module.css';

export const dialogVariants = cva(styles.dialog, {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: styles['dialog--lg'],
      md: styles['dialog--md'],
      sm: styles['dialog--sm'],
      xl: styles['dialog--xl'],
    },
  },
});

export type DialogVariants = VariantProps<typeof dialogVariants>;
