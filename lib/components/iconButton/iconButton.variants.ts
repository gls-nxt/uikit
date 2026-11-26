import { cva, type VariantProps } from 'class-variance-authority';

import styles from './iconButton.module.css';

export const buttonVariants = cva(styles.iconButton, {
  defaultVariants: {
    color: 'primary',
    loading: false,
    shape: 'round',
    size: 'md',
  },
  variants: {
    color: {
      blurred: styles['iconButton--blurred'],
      destructive: styles['iconButton--destructive'],
      /** @deprecated Use `text`. */
      ghost: styles['iconButton--text'],
      primary: styles['iconButton--primary'],
      'primary-light': styles['iconButton--primary-light'],
      secondary: styles['iconButton--secondary'],
      success: styles['iconButton--success'],
      tertiary: styles['iconButton--tertiary'],
      text: styles['iconButton--text'],
    },
    loading: {
      false: null,
      true: styles['iconButton--loading'],
    },
    shape: {
      round: styles['iconButton--round'],
      square: styles['iconButton--square'],
    },
    size: {
      lg: styles['iconButton--lg'],
      md: styles['iconButton--md'],
      sm: styles['iconButton--sm'],
      xs: styles['iconButton--xs'],
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
