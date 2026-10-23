import { cva, type VariantProps } from 'class-variance-authority';

import styles from './spinner.module.css';

export const spinnerVariants = cva(styles.spinner, {
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
  variants: {
    color: {
      inherit: null,
      inverted: styles['spinner--inverted'],
      light: styles['spinner--light'],
      muted: styles['spinner--muted'],
      primary: styles['spinner--primary'],
      success: styles['spinner--success'],
      warning: styles['spinner--warning'],
    },
    size: {
      lg: styles['spinner--lg'],
      md: styles['spinner--md'],
      sm: styles['spinner--sm'],
      xl: styles['spinner--xl'],
      xs: styles['spinner--xs'],
    },
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
