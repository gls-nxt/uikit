import { cva, type VariantProps } from 'class-variance-authority';

import styles from './menuItem.module.css';

export const menuItemVariants = cva(styles.menuItem, {
  defaultVariants: {
    size: 'sm',
  },
  variants: {
    size: {
      lg: styles['menuItem--lg'],
      sm: styles['menuItem--sm'],
    },
  },
});
export const menuItemAdornmentVariants = cva(styles.menuItemAdornment, {
  variants: {
    side: {
      left: styles['menuItemAdornment--left'],
      right: styles['menuItemAdornment--right'],
    },
  },
});

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
export type MenuItemAdornmentVariants = VariantProps<typeof menuItemAdornmentVariants>;
