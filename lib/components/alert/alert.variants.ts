import { cva, type VariantProps } from 'class-variance-authority';

import styles from './alert.module.css';

export const alertVariants = cva(styles.alert, {
  defaultVariants: {
    shadow: true,
    variant: 'info',
  },
  variants: {
    shadow: {
      false: styles['alert--no-shadow'],
      true: '',
    },
    variant: {
      error: styles['alert--error'],
      info: styles['alert--info'],
      warning: styles['alert--warning'],
    },
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
