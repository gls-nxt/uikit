import { cva, type VariantProps } from 'class-variance-authority';

import styles from './tabsList.module.css';

// Tabs List Variants
export const tabsListVariants = cva(styles['tabs-list'], {
  defaultVariants: {
    size: 'small',
  },
  variants: {
    fullWidth: {
      false: null,
      true: styles['tabs-list--full-width'],
    },
    size: {
      large: styles['tabs-list--large'],
      small: styles['tabs-list--small'],
    },
  },
});

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
