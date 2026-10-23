import { cva, type VariantProps } from 'class-variance-authority';

import styles from './toast.module.css';

export const toastContentVariants = cva(styles.content, {
  variants: {
    alignItems: {
      center: styles['content--center'],
      start: styles['content--start'],
    },
  },
});

export type ToastContentVariants = VariantProps<typeof toastContentVariants>;
