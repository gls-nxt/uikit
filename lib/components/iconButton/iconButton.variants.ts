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
      ghost: styles['iconButton--ghost'],
      primary: styles['iconButton--primary'],
      secondary: styles['iconButton--secondary'],
      tertiary: styles['iconButton--tertiary'],
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
