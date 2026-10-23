import { cva, type VariantProps } from 'class-variance-authority';

import styles from './button.module.css';

export const buttonVariants = cva(styles.button, {
  defaultVariants: {
    color: 'primary',
    fullWidth: false,
    loading: false,
    size: 'md',
  },
  variants: {
    color: {
      blurred: styles['button--blurred'],
      destructive: styles['button--destructive'],
      primary: styles['button--primary'],
      secondary: styles['button--secondary'],
      tertiary: styles['button--tertiary'],
    },
    fullWidth: {
      false: null,
      true: styles['button--fullWidth'],
    },
    loading: {
      false: null,
      true: styles['button--loading'],
    },
    size: {
      lg: styles['button--lg'],
      md: styles['button--md'],
      sm: styles['button--sm'],
      xs: styles['button--xs'],
    },
  },
});

export const iconWrapperVariants = cva(styles.buttonIcon, {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: styles['buttonIcon--lg'],
      md: styles['buttonIcon--md'],
      sm: styles['buttonIcon--sm'],
      xs: styles['buttonIcon--xs'],
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
