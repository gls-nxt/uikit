import { cva } from 'class-variance-authority';

import styles from './alerter.module.css';

export const alerterVariants = cva(styles.alerter, {
  defaultVariants: {
    position: 'fixed',
  },
  variants: {
    position: {
      fixed: styles.alerterFixed,
      static: null,
    },
  },
});
