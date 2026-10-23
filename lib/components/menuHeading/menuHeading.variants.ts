import { cva, type VariantProps } from 'class-variance-authority';

import styles from './menuHeading.module.css';

export const menuHeadingVariants = cva(styles.menuHeading, {
  defaultVariants: {
    size: 'sm',
  },
  variants: {
    size: {
      lg: styles['menuHeading--lg'],
      sm: styles['menuHeading--sm'],
    },
  },
});

export type MenuHeadingVariants = VariantProps<typeof menuHeadingVariants>;
