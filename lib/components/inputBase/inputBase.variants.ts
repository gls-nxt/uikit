import { cva, type VariantProps } from 'class-variance-authority';

import styles from './inputBase.module.css';

export const inputVariants = cva(styles.input, {
  defaultVariants: {
    size: 'lg',
  },
  variants: {
    size: {
      lg: styles['input--lg'],
      md: styles['input--md'],
      sm: styles['input--sm'],
    },
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
