import { cva, type VariantProps } from 'class-variance-authority';

import styles from './icon.module.css';

export const iconVariants = cva(styles.icon, {
  variants: {
    color: {
      error: styles['icon--error'],
      'error-muted': styles['icon--error-muted'],
      foreground: styles['icon--foreground'],
      'foreground-hover': styles['icon--foreground-hover'],
      inverted: styles['icon--inverted'],
      'inverted-hover': styles['icon--inverted-hover'],
      light: styles['icon--light'],
      muted: styles['icon--muted'],
      primary: styles['icon--primary'],
      'primary-hover': styles['icon--primary-hover'],
      'primary-muted': styles['icon--primary-muted'],
      'primary-pressed': styles['icon--primary-pressed'],
      success: styles['icon--success'],
      warning: styles['icon--warning'],
    },
    size: {
      lg: styles['icon--lg'], // 24px (1.5rem)
      md: styles['icon--md'], // 20px (1.25rem)
      sm: styles['icon--sm'], // 16px (1rem)
      xl: styles['icon--xl'], // 32px (2rem)
      xs: styles['icon--xs'], // 12px (0.75rem)
    },
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;
