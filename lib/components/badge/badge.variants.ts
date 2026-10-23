import { cva, type VariantProps } from 'class-variance-authority';

import styles from './badge.module.css';

export const badgeVariants = cva(styles.badge, {
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
  variants: {
    color: {
      blue: styles['badge--blue'],
      green: styles['badge--green'],
      grey: styles['badge--grey'],
      'light-blue': styles['badge--light-blue'],
      orange: styles['badge--orange'],
      red: styles['badge--red'],
      white: styles['badge--white'],
    },
    size: {
      lg: styles['badge--lg'],
      md: styles['badge--md'],
      sm: styles['badge--sm'],
      xs: styles['badge--xs'],
    },
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
