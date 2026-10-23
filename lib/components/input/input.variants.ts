import { cva, type VariantProps } from 'class-variance-authority';

import styles from './input.module.css';

export const wrapperVariants = cva(styles.inputWrapper, {
  defaultVariants: {
    fullWidth: false,
    labelled: false,
    size: 'lg',
  },
  variants: {
    fullWidth: {
      false: null,
      true: styles['inputWrapper--fullWidth'],
    },
    labelled: {
      false: null,
      true: styles['inputWrapper--labeled'],
    },
    size: {
      lg: styles['inputWrapper--lg'],
      sm: styles['inputWrapper--sm'],
    },
  },
});

export const inputRootVariants = cva(styles.inputRoot, {
  defaultVariants: {
    state: 'default',
  },
  variants: {
    state: {
      default: null,
      error: styles['inputRoot--error'],
    },
  },
});

export type WrapperVariants = VariantProps<typeof wrapperVariants>;
export type InputRootVariants = VariantProps<typeof inputRootVariants>;
