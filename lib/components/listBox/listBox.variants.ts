import { cva, type VariantProps } from 'class-variance-authority';

import styles from './listBox.module.css';

export const listVariants = cva(styles.list, {
  defaultVariants: {
    scrollIndicator: true,
  },
  variants: {
    scrollIndicator: {
      false: styles['list--hideScroll'],
      true: null,
    },
  },
});

export type ListVariants = VariantProps<typeof listVariants>;
